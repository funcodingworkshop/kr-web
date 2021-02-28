import { NextPageContext } from 'next';
import Layout from '../components/layout';

const TestMongo = (props: any) => {
    return (
        <Layout title="Test Mongo">
            <pre>{JSON.stringify(props, null, 4)}</pre>
        </Layout>
    );
};

export async function getStaticProps(context: NextPageContext) {
    const res = await fetch('http://localhost:3000/api/test_mongoGET');
    const data = await res.json();
    if (!data) {
        return {
            notFound: true,
        };
    }
    return { props: data };
}

export default TestMongo;
