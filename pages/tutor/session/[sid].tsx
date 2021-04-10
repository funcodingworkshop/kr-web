import React from 'react';
import { useSession } from 'next-auth/client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import SessionsList from '../../../components/SessionsList';
import { ERole } from '../../../types/ERole';

export default function ShowSessions({ data }: any) {
    const [session, loading] = useSession();
    const router = useRouter();
    const { sid } = router.query;

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

export async function getServerSideProps(context: any) {
    const res = await fetch(
        `${process.env.RESTURL}/api/list_of_sessions_POST`,
        {
            method: 'POST',
            body: context.params.sid,
        }
    );
    const data = await res.json();

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: { data }, // will be passed to the page component as props
    };
}
