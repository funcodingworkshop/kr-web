import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';

import { AppProps } from 'next/dist/next-server/lib/router/router';
import { Provider } from 'react-redux';
import { Provider as SessionProvider } from 'next-auth/client';
import { useStore } from '../store';

export default function App({ Component, pageProps }: AppProps) {
    const store = useStore(pageProps.initialReduxState);
    console.log('pageProps.session', pageProps.session);

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    // React.useEffect(() => {
    //     // console.log('on _app component mount');
    // });

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <SessionProvider session={pageProps.session}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </SessionProvider>
            </Provider>
        </ThemeProvider>
    );
}
