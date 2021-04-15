import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { ERole } from '../../types/ERole';
import StudentSessions from '../../components/StudentSessions';

type TProps = {};

export default function Student({ data }: any) {
    const [session, loading] = useSession();
    const router = useRouter();

    const mySessions = data.myCourses;

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
            <StudentSessions data={mySessions} />
        </Layout>
    );
}

export async function getServerSideProps(ctx: any) {
    const res = await fetch(`${process.env.RESTURL}/api/sessionsList_POST`, {
        method: 'POST',
        body: ctx.params.student_sess,
    });
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
