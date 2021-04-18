import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import SessionCourse from '../../../models/sessionCourse';
import Layout from '../../../components/layout';
import SessionsList from '../../../components/SessionsList';
import { connectDB } from '../../../middleware/connectDB';
import { ERole } from '../../../types/ERole';

export default function ShowSessions({ res }: any) {
    const [session, loading] = useSession();
    const router = useRouter();
    const { sid } = router.query;

    const data = JSON.parse(res);

    console.log('1111111', data);

    const name = useSelector(
        //@ts-ignore
        (state: IAddSessionState) => state.addSession.name
    );

    if (typeof window !== 'undefined' && loading) return null;
    if (!session) {
        return (
            <Layout title="Tutor profile">
                <h1>You must sign in</h1>;
            </Layout>
        );
    }
    if (session.role === ERole.Student) {
        return (
            <Layout title="Tutor profile">
                <h1>You must be an admin or tutor to see this page</h1>;
            </Layout>
        );
    }

    return (
        <Layout title="Sessions list">
            <h1>Session: {name}</h1>
            <SessionsList course={data} />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    await connectDB();

    try {
        mongoose.model('Course');
        const data = await SessionCourse.find({
            course: context.params.sid,
        }).populate('course');

        if (!data) {
            return {
                notFound: true,
            };
        }

        const res = JSON.stringify(data);
        return {
            props: { res }, // will be passed to the page component as props
        };
    } catch (e) {
        console.error(e);
    }
};
