import { NextApiRequest, NextApiResponse } from 'next';
import UserInfo from '../../models/userInfo';
import connectDB from '../../middleware/database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const users = await UserInfo.find({});
            res.json({ Users: users });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);
