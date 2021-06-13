import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs');

const connectDB = (handler: any) => async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.MONGODB_URI_AWS, {
        useNewUrlParser: true,
        ssl: true,
        sslValidate: true,
        sslCA: fs.readFileSync('../rds-combined-ca-bundle.pem'),
    });
    return handler(req, res);
};

export default connectDB;
