import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import DashboardLayout from '../dashboard/layout';
import DashboardProvider from '../dashboard/provider/context';
import ModelProvider from '../dashboard/provider/model';
import { Provider } from 'react-redux';
import store from '../redux/store';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>selekton</title>
      </Head>
      <Provider store={store}>
        <DashboardProvider>
          <ModelProvider>
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
          </ModelProvider>
        </DashboardProvider>
      </Provider>
    </>
  );
}

export default MyApp;
