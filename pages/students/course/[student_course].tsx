import { session, useSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import Layout from '../../../components/layout';
import { ERole } from '../../../types/ERole';
import StudentCourses from '../../../components/StudentCourses';
import KrCourse from '../../../models/krCourse';
import { connectDB } from '../../../middleware/connectDB';
import KrCoursesSession from '../../../models/krCoursesSession';
import { Db } from 'mongodb';

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
        const coursesResult = [];

        const courses = await KrCourse.find({
            student: ctx.query.student_course,
        });
        console.log(11111, courses);

        db.KrCourse.aggregate([
            {
                $lookup: {
                    from: 'KrCoursesSession',
                    localField: '_id',
                    foreignField: 'course._id',
                    as: 'krsessions',
                },
            },
        ]);

        // for (let i = 0; i < courses.length; i++) {
        //     const curentCourse: any = courses[i];
        //     const sessions = await KrCoursesSession.find({
        //         course: curentCourse._id,
        //     });
        //     console.log(22222, sessions);
        //     curentCourse['sessions'] = sessions;
        //     console.log(44444, curentCourse);
        //     coursesResult.push(curentCourse);
        // }

        if (!courses) {
            return {
                notFound: true,
            };
        }
        const res = JSON.stringify(courses);
        return {
            props: { res }, // will be passed to the page component as props
        };
    } catch (e) {
        console.error(e);
    }
};
