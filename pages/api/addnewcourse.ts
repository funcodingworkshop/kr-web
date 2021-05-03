import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import connectDB from '../../middleware/database';
import KrUser from '../../models/krUser';
import { ERole } from '../../types/ERole';
import KrCourse from '../../models/krCourse';

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
            error: 'You need to be an admin or tutor ',
        });
        return;
    }

    if (req.method === 'POST') {
        try {
            const {
                selectedDateStart,
                selectedDateEnd,
                student,
                status,
                comment,
            } = req.body;

            if (!student) {
                return res
                    .status(400)
                    .send({ message: 'Student name must be provided' });
            }
            const findUser = await KrUser.findOne({ name: String(student) });

            if (!findUser) {
                return res.status(400).send({
                    message: `${student} doesn't exist. You should add student name first`,
                });
            }

            const newCourse = await KrCourse.create({
                student: await KrUser.findOne({ name: String(student) }),
                dateStart: selectedDateStart,
                dateEnd: selectedDateEnd,
                status,
                comment,
            });
            return res.json(newCourse);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);
