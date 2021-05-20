import { useSession } from 'next-auth/client';
import Layout from '../../components/layout';
import { ERole } from '../../types/ERole';
import KrCourse from '../../models/krCourse';
import { connectDB } from '../../middleware/connectDB';
import { GetServerSideProps } from 'next';
import StudentCourses from '../../components/StudentCourses';
import { getSession } from 'next-auth/client';
import mongoose from 'mongoose';

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
    // mongoose.model('KrCoursesSessions', KrCoursesSession);

    // try {
    const session = await getSession({ req: ctx.req });
    const userId = session.databaseId;
    console.log(555555, userId);

    const data = await KrCourse.find({
        student: session.databaseId,
    }).populate('courseSessions');

    console.log(66666, data);
    if (!data) {
        return {
            notFound: true,
        };
    }
    // const res = JSON.stringify(data);
    // return {
    //     props: { res }, // will be passed to the page component as props
    // };
    // } catch (e) {
    //     console.error(e);
    // }
};
