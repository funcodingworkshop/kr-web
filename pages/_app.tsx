import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import { Router } from 'next/dist/client/router';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { Provider } from 'react-redux';
import { Provider as SessionProvider } from 'next-auth/client';
import { useStore } from '../store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: true });

Router.events.on('routeChangeStart', () => {
    NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
    NProgress.done();
});

Router.events.on('routeChangeError', () => {
    NProgress.done();
});

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
