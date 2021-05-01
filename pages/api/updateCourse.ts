import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import KrCourse from '../../models/krCourse';
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

    if (req.method === 'PUT') {
        try {
            const { id, status, comment } = req.body;

            if (!status && !comment) {
                return res.status(400).send({ message: 'Insufficient data' });
            } else if (!status) {
                const updatedCourse = await KrCourse.findByIdAndUpdate(
                    id,
                    { comment },
                    { new: true }
                );
                return res.json(updatedCourse);
            } else if (!comment) {
                const updatedCourse = await KrCourse.findByIdAndUpdate(
                    id,
                    { status },
                    { new: true }
                );
                return res.json(updatedCourse);
            } else {
                const updatedCourse = await KrCourse.findByIdAndUpdate(
                    id,
                    { status, comment },
                    { new: true }
                );
                return res.json(updatedCourse);
            }
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);
