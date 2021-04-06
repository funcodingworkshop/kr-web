import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import Course from '../../models/course';
import connectDB from '../../middleware/database';
import SessionCourse from '../../models/sessionCourse';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
        res.send({
            error: 'You must be authorized',
        });
        return;
    }

    if (session.role === 'student') {
        res.send({
            error: 'You need to be an admin or tutor ',
        });
        return;
    }

    if (req.method === 'POST') {
        try {
            const { description, videolink, feedback, id } = req.body;

            const addNewSession = await SessionCourse.create({
                course: await Course.findOne({ _id: String(id) }),
                date: new Date(),
                description,
                videolink,
                feedback,
            });

            return res.json(addNewSession);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);
