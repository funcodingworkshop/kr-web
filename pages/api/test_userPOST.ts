import connectDB from '../../middleware/database';
import bcrypt from 'bcryptjs';
import User from '../../models/user';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            if (!req.body) {
                res.statusCode = 404;
                res.end('Error: insufficient data');
                return;
            }
            const { email, password, name } = req.body;

            console.log(req.body);

            const candidate = await User.findOne({ email: email });
            if (candidate) {
                // res.statusCode = 400;
                res.json({ message: 'User already exists' });
                return;
            }
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(password, salt);

            const newUser = new User({
                email,
                passwordHash,
                name,
            });

            const usercreated = await newUser.save();
            return res.status(200).send(usercreated);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);
