import { session, useSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import Layout from '../../../components/layout';
import { ERole } from '../../../types/ERole';
import StudentCourses from '../../../components/StudentCourses';
import KrCourse from '../../../models/krCourse';
import { connectDB } from '../../../middleware/connectDB';
import mongoose from 'mongoose';
import { getSession } from 'next-auth/client';
import KrUser from '../../../models/krUser';
import KrCoursesSession from '../../../models/krCoursesSession';

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
            <pre>{JSON.stringify(myCourses, null, 4)}</pre>

            <StudentCourses data={myCourses} />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // await connectDB();
    // mongoose.model('KrCoursesSessions');
    // try {

    const session = await getSession({ req: ctx.req });
    const userId = session.databaseId;
    console.log(555555, userId);

    const user = await KrUser.findById(userId);
    const courses = await KrCourse.find({ student: userId });
    const coursesResArr = [];
    for (let i = 0; i < courses.length; i++) {
        const courseId = courses[i]._id;
        const sessions = await KrCoursesSession.find({ course: courseId });
        const coursesRes = { ...courses[i].toJSON(), sessions };
        coursesResArr.push(coursesRes);
    }
    const userRes = { ...user.toJSON(), courses: coursesResArr };
    const res = JSON.stringify(userRes);
    console.log(99999, res);
    return { props: { res } };

    // const data = await KrCourse.find({
    //     student: session.databaseId,
    // }).populate('courseSessions');

    // const res = JSON.stringify(data);

    // console.log(66666, data);

    // if (!res) {
    //     return {
    //         notFound: true,
    //     };
    // }
    // return {
    //     props: { res }, // will be passed to the page component as props
    // };
};
