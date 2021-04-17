import React from 'react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import Layout from '../../components/layout';
import CourseList from '../../components/CourseList';
import { ERole } from '../../types/ERole';

export default function TutorPage({ data }: any) {
    const [session, loading] = useSession();

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
            <CourseList courses={data.courses} />

            <h1>
                <Link href="/tutor/addnewcourse">
                    <a>Add new course</a>
                </Link>
            </h1>
        </Layout>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`${process.env.RESTURL}/api/list_of_course_GET`);
    console.log('RES', res);

    const data = await res.json();

    if (!data) {
        return {
            notFound: true,
        };
    }
    return {
        props: { data }, // will be passed to the page component as props
    };
}
