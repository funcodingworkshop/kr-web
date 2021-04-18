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

export default function TutorPage({ res }: any) {
    const [session, loading] = useSession();
    const data = JSON.parse(res);

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

    return (
        <Layout title="Tutor profile">
            <h1>Courses</h1>
            <CourseList courses={data} />

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
