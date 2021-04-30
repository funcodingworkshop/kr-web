// import { useSession } from 'next-auth/client';
// import Link from 'next/link';
// import Layout from '../../components/layout';
// import { ERole } from '../../types/ERole';

// type TProps = {};

// export default function Student(props: TProps) {
//     const [session, loading] = useSession();

//     if (typeof window !== 'undefined' && loading) return null;
//     if (!session) {
//         return (
//             <Layout title="Student profile">
//                 <h1>You must sign in</h1>;
//             </Layout>
//         );
//     }
//     if (session.role !== ERole.Student) {
//         return (
//             <Layout title="Student profile">
//                 <h1>You must be a student to see this page</h1>;
//             </Layout>
//         );
//     }

//     return (
//         <Layout title={`${session.user.name}\'s profile`}>
//             <h1>
//                 <Link
//                     as={`/students/${session.databaseId}`}
//                     href="/students/[student_sess]"
//                 >
//                     <a>My sessions</a>
//                 </Link>
//             </h1>
//         </Layout>
//     );
// }
import { getSession } from 'next-auth/client';
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
        <Layout title={`${session.user.name}\'s profile`}>
            <StudentSessions data={mySessions} />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const req = ctx.req;
    const session = await getSession({ req });

    console.log(1111, session);
    await connectDB();
    try {
        const studentSessions = await SessionCourse.find({}).populate({
            path: 'course',
            model: Course,
            populate: {
                path: 'student',
                model: UserInfo,
                match: { _id: session.data },
            },
        });
        console.log(2222, studentSessions);
        const data = studentSessions.filter((el) => el.course?.student);
        console.log(333, data);
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
