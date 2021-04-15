import { useSession } from 'next-auth/client';
import Link from 'next/link';
import Layout from '../../components/layout';
import { ERole } from '../../types/ERole';

type TProps = {};

export default function Student(props: TProps) {
    const [session, loading] = useSession();

    console.log('SESSION', session);

    if (typeof window !== 'undefined' && loading) return null;
    if (!session) {
        return (
            <Layout title="Student profile">
                <h1>You must sign in</h1>;
            </Layout>
        );
    }
    if (session.role !== ERole.Student) {
        return (
            <Layout title="Student profile">
                <h1>You must be a student to see this page</h1>;
            </Layout>
        );
    }

    return (
        <Layout title={`${session.user.name}\'s profile`}>
            <h1>
                <Link
                    as={`/students/${session.databaseId}`}
                    href="/students/[student_sess]"
                >
                    <a>My sessions</a>
                </Link>
            </h1>
        </Layout>
    );
}
