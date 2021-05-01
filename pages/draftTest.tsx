import Layout from '../components/layout';
import MyEditor from '../components/DraftEditor';
import { useEffect, useState } from 'react';

export default function DraftTest() {
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        setFlag(true);
    }, []);

    return (
        <Layout title="Test">
            <h1>Draft Test</h1>
            {flag && <MyEditor />}
        </Layout>
    );
}
