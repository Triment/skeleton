import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import DashboardLayout from '../dashboard/layout';
import DashboardProvider from '../dashboard/provider/context';
import ModelProvider from '../dashboard/provider/model';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { host } from '../config';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import { NextApiRequest, NextApiResponse } from 'next';

function MyApp({ Component, pageProps }: AppProps) {
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
MyApp.getInitialProps = async ({
  ctx,
}: AppContext & { ctx: { req: NextApiRequest; res: NextApiResponse } }) => {
  console.log(ctx.req.cookies);
  const data = await (await fetch(`${host.api}/auth/getmenu`)).json(); //公共api
  // ctx.req.redirect(200, '/login/login')
  return { PublicMenu: data };
};
export default MyApp;
