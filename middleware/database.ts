import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs');
const path = require('path');

const connectDB = (handler: any) => async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res);
    }

    if (process.env.DB === 'AWS') {
        await mongoose.connect(process.env.MONGODB_URI_AWS, {
            useNewUrlParser: true,
            ssl: true,
            sslValidate: true,
            sslCA: fs.readFileSync(
                path.join(process.cwd(), 'rds-combined-ca-bundle.pem')
            ),
        });
        return handler(req, res);
    } else {
        await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useNewUrlParser: true,
        });
        return handler(req, res);
    }
};

export default connectDB;
