import React from 'react';
import Layout from '../../components/layout';
import { useSession } from 'next-auth/client';
import { AddNewSessionForm } from '../../components/AddNewSessionForm';
import { ERole } from '../../types/ERole';

type TProps = {};

export default function AddNewSession(props: TProps) {
    const [session, loading] = useSession();
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
        <Layout title="TutorPage">
            <p>Create new session</p>
            <AddNewSessionForm />
        </Layout>
    );
}
