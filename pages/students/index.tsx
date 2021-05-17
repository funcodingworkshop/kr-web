import { useSession } from 'next-auth/client';
import Link from 'next/link';
import Layout from '../../components/layout';
import { ERole } from '../../types/ERole';
import KrCourse from '../../models/krCourse';
import { connectDB } from '../../middleware/connectDB';
import { GetServerSideProps } from 'next';
import StudentCourses from '../../components/StudentCourses';

export default function Student({ res }: any) {
    const myCourses = JSON.parse(res);
    const [session, loading] = useSession();
    if (typeof window !== 'undefined' && loading) return null;
    if (!session) {
        return (
            <Layout title="Student profile">
                <h1>You must sign in</h1>;
            </Layout>
        );
    }
    if (session.role !== ERole.Student) {
        return (
            <Layout title="Student profile">
                <h1>You must be a student to see this page</h1>;
            </Layout>
        );
    }
    const name = session.user.name ? session.user.name : session.user.email;

    return (
        <Layout title={`${name}\'s profile`}>
            <StudentCourses data={myCourses} />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    await connectDB();
    try {
        const data = await KrCourse.find({ student: ctx.query });

        if (!data) {
            return {
                notFound: true,
            };
        }
        const res = JSON.stringify(data);
        return {
            props: { res }, // will be passed to the page component as props
        };
    } catch (e) {
        console.error(e);
    }
};
