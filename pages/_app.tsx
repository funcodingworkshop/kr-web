import { AppProps } from 'next/dist/next-server/lib/router/router';
import { Provider } from 'react-redux';
import { Provider as SessionProvider } from 'next-auth/client';
import { useStore } from '../store';
import Cookies from 'js-cookie';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
    const store = useStore(pageProps.initialReduxState);

    const cookies = Cookies.get();

    // console.log('Cookies: ', cookies);
    console.log('pageProps.session', pageProps.session);

    React.useEffect(() => {
        // console.log('on _app component mount');
    });

    return (
        <Provider store={store}>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </Provider>
    );
}
