import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Course from '../../models/course';
import connectDB from '../../middleware/database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            mongoose.model('User');
            const courses = await Course.find({}).populate('student');

            if (!courses) {
                return null;
            }
            res.json({ courses });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);
