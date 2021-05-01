import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import KrCoursesSession from '../../models/krCoursesSession';
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
            const { id, description, videolink, feedback } = req.body;

            if (!description && !videolink && !feedback) {
                return res.status(400).send({ message: 'Insufficient data' });
            } else if (!description && !videolink) {
                const updatedSession = await KrCoursesSession.findByIdAndUpdate(
                    id,
                    { feedback },
                    { new: true }
                );
                return res.json(updatedSession);
            } else if (!description && !feedback) {
                const updatedSession = await KrCoursesSession.findByIdAndUpdate(
                    id,
                    { videolink },
                    { new: true }
                );
                return res.json(updatedSession);
            } else if (!videolink && !feedback) {
                const updatedSession = await KrCoursesSession.findByIdAndUpdate(
                    id,
                    { description },
                    { new: true }
                );
                return res.json(updatedSession);
            } else if (!description) {
                const updatedSession = await KrCoursesSession.findByIdAndUpdate(
                    id,
                    { videolink, feedback },
                    { new: true }
                );
                return res.json(updatedSession);
            } else if (!videolink) {
                const updatedSession = await KrCoursesSession.findByIdAndUpdate(
                    id,
                    { description, feedback },
                    { new: true }
                );
                return res.json(updatedSession);
            } else if (!feedback) {
                const updatedSession = await KrCoursesSession.findByIdAndUpdate(
                    id,
                    { description, videolink },
                    { new: true }
                );
                return res.json(updatedSession);
            } else {
                const updatedSession = await KrCoursesSession.findByIdAndUpdate(
                    id,
                    { description, videolink, feedback },
                    { new: true }
                );
                return res.json(updatedSession);
            }
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);
