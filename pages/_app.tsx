import { AppProps } from 'next/dist/next-server/lib/router/router';
import { Provider } from 'react-redux';
import { Provider as SessionProvider } from 'next-auth/client';
import { useStore } from '../store';
import Cookies from 'js-cookie';

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  const cookies = Cookies.get();

  console.log('Cookies: ', cookies);

  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
