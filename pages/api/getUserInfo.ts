import connectDB from '../../middleware/database';
import User from '../../models/user';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const email = req.query.email;
            const user = await User.findOne({ email });
            const userId = user._id;
            res.json({ userId: userId });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);
