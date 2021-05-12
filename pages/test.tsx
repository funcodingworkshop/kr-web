import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/client';
import Layout from '../components/layout';
import { connectDB } from '../middleware/connectDB';
import KrCourse from '../models/krCourse';
import mongoose from 'mongoose';
import KrCoursesSession from '../models/krCoursesSession';

export default function Test({ data }: any) {
    console.log('Data', data);
    const [session, loading] = useSession();

    if (typeof window !== 'undefined' && loading) return null;
    if (!session) {
        return (
            <Layout title="Student profile">
                <h1>You must sign in</h1>;
            </Layout>
        );
    }

    const list = JSON.parse(data);

    return (
        <div>
            <h1>Data</h1>
            <pre>{JSON.stringify(list, null, 4)}</pre>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    await connectDB();
    mongoose.model('KrCoursesSessions');
    const id = '608b11c584b05f150c675a42'; //User's ID
    const res = await KrCourse.find({ student: id }).populate('courseSessions');
    const data = JSON.stringify(res);

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: { data: data }, // will be passed to the page component as props
    };
};
