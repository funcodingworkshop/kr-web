import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import KrUser from '../../models/krUser';
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

    if (session.role !== ERole.Admin) {
        res.send({
            error: 'You need to be an admin',
        });
        return;
    }

    if (req.method === 'PUT') {
        try {
            const { id, name, role } = req.body;
            console.log(id, name, role);
            if (!name && !role) {
                return res.status(400).send({ message: 'Insufficient data' });
            } else if (!name) {
                const updatetUserInfo = await KrUser.findByIdAndUpdate(
                    id,
                    { role },
                    { new: true }
                );
                return res.json(updatetUserInfo);
            } else if (!role) {
                const updatetUserInfo = await KrUser.findByIdAndUpdate(
                    id,
                    { name },
                    { new: true }
                );
                return res.json(updatetUserInfo);
            } else {
                const updatetUserInfo = await KrUser.findByIdAndUpdate(
                    id,
                    { name, role },
                    { new: true }
                );
                return res.json(updatetUserInfo);
            }
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);
