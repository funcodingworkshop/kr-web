import connectDB from '../../middleware/database';
import User from '../../models/user';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PATCH') {
        try {
            if (!req.body) {
                res.statusCode = 404;
                res.end('Error: insufficient data');
                return;
            }
            const { role, name } = req.body;

            console.log(req.body);
 
            const result = await User.updateOne(
              { role, name },)
             return res.json(result);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);
