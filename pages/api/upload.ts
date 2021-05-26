import nextConnect from 'next-connect';
import multer from 'multer';
import { getSession } from 'next-auth/client';
import { NextApiRequest, NextApiResponse } from 'next';
import KrUser from '../../models/krUser';

const oneMegabyteInBytes = 1000000;

const upload = multer({
    limits: { fileSize: oneMegabyteInBytes * 2 },
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
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

apiRoute.use(upload.array('theFiles'));

apiRoute.post(async (req: any, res) => {
    const session = await getSession({ req });
    if (!session) {
        res.send({
            error: 'You must be authorized',
        });
        return;
    }

    const id = session.databaseId;
    const updatedImage = await KrUser.findByIdAndUpdate(
        id,
        {
            image: `${req.files[0].originalname}`,
        },
        { new: true }
    );

    res.status(200).json({ data: 'success', updatedImage });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
