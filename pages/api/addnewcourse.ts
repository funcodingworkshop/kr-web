import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import Course from '../../models/course';
import connectDB from '../../middleware/database';
import UserInfo from '../../models/userInfo';
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
            const findUser = await UserInfo.findOne({ name: String(student) });

            if (!findUser) {
                return res.status(400).send({
                    message: `${student} doesn't exist. You should add student name first`,
                });
            }

            const newCourse = await Course.create({
                student: await UserInfo.findOne({ name: String(student) }),
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
