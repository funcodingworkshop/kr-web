import NextAuth, { User, Session } from 'next-auth';
import Providers from 'next-auth/providers';
import { NextApiRequest, NextApiResponse } from 'next';

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
            console.log('TODO save to database a new user', user, account);
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
        async session(session: Session & { someInfo: string }, token: any) {
            // HERE we can call database to add some data into session
            session.someInfo = 'testing';
            return session;
        },
    },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
    // @ts-ignore
    return NextAuth(req, res, options);
};
