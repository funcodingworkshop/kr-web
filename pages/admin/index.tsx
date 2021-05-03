import Link from 'next/link';
import Layout from '../../components/layout';
import React from 'react';
import { useSession } from 'next-auth/client';
import { ERole } from '../../types/ERole';

type TProps = {};

export default function Admin(props: TProps) {
    const [session, loading] = useSession();

    if (typeof window !== 'undefined' && loading) return null;
    if (!session) {
        return (
            <Layout title="Admin profile">
                <h1>You must sign in</h1>;
            </Layout>
        );
    }
    if (session.role !== ERole.Admin) {
        return (
            <Layout title="Admin profile">
                <h1>You must be an admin to see this page</h1>;
            </Layout>
        );
    }

    return (
        <Layout title="Admin Profile">
            <Link href={'/admin/userlist'}>
                <a>
                    <h2>Edit userlist</h2>
                </a>
            </Link>
        </Layout>
    );
}
