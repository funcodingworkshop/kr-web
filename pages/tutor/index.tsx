import React from 'react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Layout from '../../components/layout';
import CourseList from '../../components/CourseList';
import { ERole } from '../../types/ERole';
import { connectDB } from '../../middleware/connectDB';
import mongoose from 'mongoose';
import Course from '../../models/course';
import { useRouter } from 'next/router';

export interface TutorPageProps {
    res: string | undefined;
}

export interface ITutorData {
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
}

export default function TutorPage({ res }: TutorPageProps) {
    const [session, loading] = useSession();
    const data: ITutorData[] = JSON.parse(res);

    const router = useRouter();

    if (typeof window !== 'undefined' && loading) return null;
    if (!session) {
        return (
            <Layout title="Tutor profile">
                <h1>You must sign in</h1>;
            </Layout>
        );
    }
    if (session.role === ERole.Student) {
        return (
            <Layout title="Tutor profile">
                <h1>You must be an admin or tutor to see this page</h1>;
            </Layout>
        );
    }

    const refreshServerSideProps: Function = () => {
        router.replace(router.asPath);
    };

    return (
        <Layout title="Tutor profile">
            <h1>Courses</h1>
            <CourseList
                courses={data}
                refreshServerSideProps={refreshServerSideProps}
            />

            <h1>
                <Link href="/tutor/addnewcourse">
                    <a>Add new course</a>
                </Link>
            </h1>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    await connectDB();
    try {
        mongoose.model('UserInfo');
        const data = await Course.find({}).populate('student');

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
