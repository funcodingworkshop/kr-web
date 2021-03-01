import NextAuth, { User } from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { TUserSession } from '../../../types/userSession';

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
            // TODO: save to database a new user
            // console.log('TODO save to database a new user', user, account);

            const addNewUser = async (newUser: any) => {
                try {
                    const response = await axios.post(
                        'http://localhost:3000/api/addNewUser',
                        newUser
                    );
                    return response.data;
                } catch (e) {
                    console.error(e);
                }
            };

            const newUser = {
                email: user.email,
                password: 'qwerty',
                name: user.name,
            };
            console.log('New User: ', newUser);

            addNewUser(newUser)
                .then((data) => {
                    console.log(data);
                })
                .catch((e) => {
                    console.log('Error: ', e.message);
                });

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
            // HERE we can call database to add some data into session

            if (session) {
                const { email } = session.user;

                const getUserInfo = async () => {
                    try {
                        const response = await axios.get(
                            'http://localhost:3000/api/getUserInfo',
                            {
                                params: { email },
                            }
                        );
                        return response.data;
                    } catch (e) {
                        console.error(e);
                    }
                };
                const userId = await getUserInfo();
                session.databaseId = userId.userId;
            }
            session.someInfo = 'testing';
            return session;
        },
    },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, options);
};
