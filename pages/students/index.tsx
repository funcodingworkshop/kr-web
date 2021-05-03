import { useSession } from 'next-auth/client';
import Link from 'next/link';
import Layout from '../../components/layout';
import { ERole } from '../../types/ERole';

type TProps = {};

export default function Student(props: TProps) {
    const [session, loading] = useSession();

    console.log('!!!!', session);

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

    const name = session.user.name ? session.user.name : session.user.email;

    return (
        <Layout title={`${name}\'s profile`}>
            <h2>
                <Link
                    as={`/students/course/${session.databaseId}`}
                    href="/students/course/[student_course]"
                >
                    <a>My courses</a>
                </Link>
            </h2>
        </Layout>
    );
}
