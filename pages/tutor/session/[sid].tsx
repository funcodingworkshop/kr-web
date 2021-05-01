import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import KrCoursesSession from '../../../models/krCoursesSession';
import Layout from '../../../components/layout';
import SessionsList from '../../../components/SessionsList';
import { connectDB } from '../../../middleware/connectDB';
import { ERole } from '../../../types/ERole';

export interface IShowSessionsProps {
    res: string | undefined;
}

export interface ISessionsList {
    course: {
        comment: string | undefined;
        dateEnd: Date | null;
        dateStart: Date;
        status: string | undefined;
        _id: string;
    };
    date: Date;
    description: string;
    feedback: string;
    videolink: string;
    _id: string;
}

export default function ShowSessions({ res }: IShowSessionsProps) {
    const [session, loading] = useSession();
    const router = useRouter();
    const { sid } = router.query;

    const data: ISessionsList[] = JSON.parse(res);

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

    const updateSessionsList: Function = () => {
        router.replace(router.asPath);
    };

    return (
        <Layout title="Sessions list">
            <h1>Session: {name}</h1>
            <SessionsList
                course={data}
                updateSessionsList={updateSessionsList}
            />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    await connectDB();

    try {
        mongoose.model('KrCourse');
        const data = await KrCoursesSession.find({
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
