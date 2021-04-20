import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import SessionCourse from '../../models/sessionCourse';
import connectDB from '../../middleware/database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            mongoose.model('Course');
            const sessionCourse = await SessionCourse.find({
                course: req.body,
            }).populate('course');

            if (!sessionCourse) {
                return null;
            }
            res.json({ sessionCourse });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);