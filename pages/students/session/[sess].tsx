import { useSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import Layout from '../../../components/layout';
import { ERole } from '../../../types/ERole';
import KrCoursesSession from '../../../models/krCoursesSession';
import { connectDB } from '../../../middleware/connectDB';
import StudentSessions from '../../../components/StudentSessions';

export default function StudentSession({ res }: any) {
    const [session, loading] = useSession();

    const mySession = JSON.parse(res);

    console.log(44444, mySession);

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
            <h1> {mySession.description}</h1>
            <h4>{mySession.date}</h4>
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${mySession.videolink}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <pre>{mySession.feedback}</pre>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    await connectDB();
    try {
        const data = await KrCoursesSession.findById(ctx.query.sess);

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
