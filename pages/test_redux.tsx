import Page from '../components/test_redux/page';
import { IRootState } from '../redux/reducers';
import Layout from '../components/layout';
import { ELoggedIn } from '../types/ELoggedIn';

export default function SSG() {
    return (
        <Layout title="Test Redux Page">
            <Page />
        </Layout>
    );
}

const initialReduxState: IRootState = {
    app: {
        currentUser: 'Unknown2',
        currentEmail: 'unknown@email.com',
        loading: false,
        isLoggedIn: ELoggedIn.Unknown,
        currentId: 'unknown',
        currentRole: 'unknown',
    },
    test: { lastUpdate: Date.now(), light: false, count: 0 },
    addSession: { id: null, name: null },
};

// If you build and start the app, the date returned here will have the same
// value for all requests, as this method gets executed at build time.
export function getStaticProps() {
    // Note that in this case we're returning the state directly, without creating
    // the store first (like in /pages/ssr.js), this approach can be better and easier
    return {
        props: {
            initialReduxState,
        },
    };
}
