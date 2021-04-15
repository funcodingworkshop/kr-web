import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Course from '../../models/course';
import SessionCourse from '../../models/sessionCourse';
import connectDB from '../../middleware/database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            mongoose.model('User');
            const studentSessions = await SessionCourse.find({}).populate({
                path: 'course',
                model: 'Course',
                populate: {
                    path: 'student',
                    model: 'User',
                    match: { _id: req.body },
                },
            });

            const myCourses = studentSessions.filter((el) => el.course.student);

            if (!studentSessions) {
                return null;
            }
            res.json({ myCourses });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);
