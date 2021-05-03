import { useSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import Layout from '../../../components/layout';
import { ERole } from '../../../types/ERole';
import KrCoursesSession from '../../../models/krCoursesSession';
import { connectDB } from '../../../middleware/connectDB';
import StudentSessions from '../../../components/StudentSessions';

export default function StudentSession({ res }: any) {
    const [session, loading] = useSession();

    const myCourses = JSON.parse(res);

    console.log(44444, myCourses);

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
            <h1> My sessions</h1>
            <StudentSessions data={myCourses} />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    await connectDB();
    try {
        const data = await KrCoursesSession.find({
            course: ctx.query.student_sessions,
        });

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
