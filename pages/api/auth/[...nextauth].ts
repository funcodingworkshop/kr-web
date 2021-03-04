import NextAuth, { User } from 'next-auth';
import Providers from 'next-auth/providers';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { TUserSession } from '../../../types/userSession';
import UserModel from '../../../models/user';
import { connectDB } from '../../../middleware/connectDB';

const options = {
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
    ],
    callbacks: {
        async signIn(user: User, account: any, profile: any) {
            await connectDB();

            try {
                const candidate = await UserModel.findOne({
                    email: user.email,
                });

                if (candidate) {
                    console.log('User already exists');
                    return;
                }
                //пароль оставил чтобы не менять схему в БД
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync('qwerty', salt);

                const newUser = new UserModel({
                    email: user.email,
                    passwordHash,
                    name: user.name,
                });

                await newUser.save();
                console.log('New user added');
                return;
            } catch (e) {
                console.error(e);
            }

            const isAllowedToSignIn = true;
            if (isAllowedToSignIn) {
                return true;
            } else {
                // Return false to display a default error message
                return false;
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },

        async session(session: TUserSession, token: any) {
            await connectDB();
            if (session) {
                try {
                    const { email } = session.user;
                    const user = await UserModel.findOne({ email });
                    session.databaseId = user._id;
                } catch (error) {
                    console.error(error);
                }
            }
            session.someInfo = 'testing';
            return session;
        },
    },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, options);
};
