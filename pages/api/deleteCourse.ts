import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import Course from '../../models/course';
import connectDB from '../../middleware/database';
import { ERole } from '../../types/ERole';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) {
        res.send({
            error: 'You must be authorized',
        });
        return;
    }

    if (session.role === ERole.Student) {
        res.send({
            error: 'You need to be an admin or tutor',
        });
        return;
    }

    if (req.method === 'DELETE') {
        try {
            const id = req.body;
            await Course.deleteOne({ _id: id });
            res.send({
                message: 'Course has been deleted',
            });
            return;
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);
