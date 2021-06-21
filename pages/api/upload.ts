import nextConnect from 'next-connect';
import multer from 'multer';
import { getSession } from 'next-auth/client';
import { NextApiRequest, NextApiResponse } from 'next';
import KrUser from '../../models/krUser';
import fs from 'fs';
import * as AWS from 'aws-sdk';
import util from 'util';
const { v4: uuidv4 } = require('uuid');

const unlinkFile = util.promisify(fs.unlink);

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.AWS_BUCKET_SECRET_KEY;

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
});

const apiRoute = nextConnect({
    onError(error, req: NextApiRequest, res: NextApiResponse) {
        res.status(501).json({
            error: `Sorry something Happened! ${error.message}`,
        });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

const uploadMiddleware = upload.single('theFile');

apiRoute.use(uploadMiddleware);

const uploadToS3 = async (file: any): Promise<string> => {
    console.log(22222, file);
    const name = uuidv4() + '.jpg';

    const fileStream = fs.createReadStream(file.path);

    console.log(3333, fileStream);

    await s3
        .putObject({
            Key: name,
            Bucket: bucketName,
            ContentType: 'image/jpeg',
            Body: fileStream,
            ACL: 'public-read',
        })
        .promise()
        .then((data: any) => {
            console.log(666666, data);
        });
    return `https://${bucketName}.s3.${region}.amazonaws.com/${name}`;
};

apiRoute.get((req, res) => {
    res.send({ message: 'hi' });
});

apiRoute.post(async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        res.send({
            error: 'You must be authorized',
        });
        return;
    }
    try {
        //@ts-ignore
        const file = req.file;
        console.log(111111, file);

        const result = await uploadToS3(file);

        console.log(4444, result);

        await unlinkFile(file.path);

        const id = session.databaseId;
        const updatedImage = await KrUser.findByIdAndUpdate(
            id,
            {
                image: result,
            },
            { new: true }
        );

        console.log(555, updatedImage);

        res.status(200).json({
            data: 'upload success',
            imgPath: result,
        });
    } catch (err) {
        console.log(err);
    }
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
