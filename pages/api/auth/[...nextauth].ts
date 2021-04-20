import NextAuth, { User } from 'next-auth';
import Providers from 'next-auth/providers';
import { NextApiRequest, NextApiResponse } from 'next';
import { TUserSession } from '../../../types/userSession';
import UserInfo from '../../../models/userInfo';
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
        Providers.Email({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: 587,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    database: process.env.MONGODB_URI,

    callbacks: {
        async signIn(user: User, account: any, profile: any) {
            await connectDB();
            try {
                const candidate = await UserInfo.findOne({
                    email: user.email,
                });

                if (!candidate) {
                    const newUserInfo = new UserInfo({
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        date: new Date(),
                    });
                    await newUserInfo.save();
                    console.log('New user info added');
                    return;
                }

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
                    const userInfo = await UserInfo.findOne({ email });
                    session.databaseId = userInfo._id;
                    session.role = userInfo.role;
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
