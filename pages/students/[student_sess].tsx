import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Layout from '../../components/layout';
import { ERole } from '../../types/ERole';
import StudentSessions from '../../components/StudentSessions';
import Course from '../../models/course';
import UserInfo from '../../models/userInfo';
import SessionCourse from '../../models/sessionCourse';
import { connectDB } from '../../middleware/connectDB';
import mongoose from 'mongoose';
import Session from '../../components/Session';

export interface IStudentListProps {
    res: string | undefined;
}

export interface IStudentSess {
    course: {
        comment: string | undefined;
        dateEnd: Date | null;
        dateStart: Date;
        status: string | undefined;
        _id: string;
        student: {
            date: Date;
            email: string;
            image: string;
            name: string;
            role: string;
            _id: string;
        };
    };
    date: Date;
    description: string;
    feedback: string;
    videolink: string;
    _id: string;
}

export default function Student({ res }: IStudentListProps) {
    const [session, loading] = useSession();
    const router = useRouter();

    const mySessions: IStudentSess[] = JSON.parse(res);

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
        <Layout title={`Session ${session.date}`}>
            <Session course={mySessions} />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    await connectDB();

    try {
        mongoose.model('SessionCourse');
        const data = await SessionCourse.find({
            _id: context.params.student_sess,
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
