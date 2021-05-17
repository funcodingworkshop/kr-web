import { session, useSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import Layout from '../../../components/layout';
import { ERole } from '../../../types/ERole';
import StudentCourses from '../../../components/StudentCourses';
import KrCourse from '../../../models/krCourse';
import { connectDB } from '../../../middleware/connectDB';
import mongoose from 'mongoose';

export default function StudentCourse({ res }: any) {
    const [session, loading] = useSession();

    const myCourses = JSON.parse(res);

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
            <h1> My courses</h1>
            <StudentCourses data={myCourses} />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    await connectDB();
    try {
        mongoose.model('KrCoursesSessions');
        const courses = await KrCourse.find({
            student: ctx.query.student_course,
        }).populate('courseSessions');
        const res = JSON.stringify(courses);

        console.log(11111, courses);

        if (!res) {
            return {
                notFound: true,
            };
        }

        return {
            props: { res }, // will be passed to the page component as props
        };
    } catch (e) {
        console.error(e);
    }
};
