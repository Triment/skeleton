import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import 'tailwindcss/tailwind.css';
import DashboardLayout from '../dashboard/layout';
import DashboardProvider from '../dashboard/provider/context';
import ModelProvider from '../dashboard/provider/modal';
import fetchJson from '../lib/fetchJson';
import store from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>selekton</title>
      </Head>
      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => console.log(err),
        }}
      >
        <Provider store={store}>
          <DashboardProvider>
            <ModelProvider>
              <DashboardLayout>
                <Component {...pageProps} />
              </DashboardLayout>
            </ModelProvider>
          </DashboardProvider>
        </Provider>
      </SWRConfig>
    </>
  );
}
export default MyApp;
