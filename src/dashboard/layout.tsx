import Main from './main';
import Overlay from './provider/overlay';
import TopNavigation from './topnavigation';
import SideNavigation from './sidenavigation';
import { useToggle } from './provider/context';
import { useModal } from './provider/modal';
import { useRouter } from 'next/router';
import { ComponentProps } from 'react';
import { Login } from '../components/auth/Login';
import { withSessionSsr } from '../lib/withSession';
import { host } from '../config';
import useUser from '../lib/useUser';
/*	w-[calc(100%-16rem)] class get the remain width of the main component from lg:viewport by subtracting
(the total width by the width of the side navigation component which is w-64 = 16rem)*/

const style = {
  open: 'lg:w-full',
  close: 'lg:pl-4 lg:w-[calc(100%-16rem)]',
  mainContainer: `flex flex-col w-full h-screen pl-0 lg:space-y-4`,
  container: `bg-gray-100 h-screen overflow-hidden relative lg:p-4`,
  main: `h-screen overflow-auto pb-36 pt-8 px-2 md:pb-8 md:pt-4 lg:pt-0`,
};

const publicMenus = ['/', '/auth/login', '/admin/manger/'];

function DashboardLayout({ children }: ComponentProps<'div'>) {
  const { user, mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true
  });
  const { open } = useToggle();
  const { modalOpen, refOfModal, show } = useModal();

  const { pathname } = useRouter();
  let ok = false;
  console.log(user);
  publicMenus.map((item) => {
    //公共api
    if (item === pathname) {
      ok = true;
      return;
    }
  });
  console.log(ok, user);
  if (!!user?.role) {
    console.log(`进入遍历用户菜单`, user);
    user.role!.menus.map((item) => {
      if (item.link === pathname) {
        ok = true;
        return;
      }
    });
  }
  // 获取
  console.log(`${pathname} 是否通过${ok}`);
  if (ok) {
    //管理界面
    console.log(user)
    if (user?.role && user?.role.raw !== 'guest') {
      return (
        <div className={style.container}>
          <div
            onClick={() => show()}
            className={`absolute justify-center w-full h-full ease-in duration-300 ${modalOpen ? 'flex z-50' : 'hidden'
              }`}
          >
            <div className={`flex-col flex justify-center`}>
              <div
                onClick={() => console.log('model')}
                className={`dark:bg-gray-700 w-96 h-auto ease-in duration-300 `}
                ref={refOfModal}
              ></div>
            </div>
          </div>
          <div className={`flex items-start ${modalOpen ? ' blur-sm' : ''}`}>
            <Overlay />
            <SideNavigation mobilePosition="left" />
            <div
              className={`${style.mainContainer} 
            ${open ? style.open : style.close}`}
            >
              {user && <TopNavigation />}
              <Main className={style.main}>{children}</Main>
            </div>
          </div>
        </div>
      );
    }
    //对于匿名者显示界面
    return <div className={style.container}>
      <div className={`absolute inset-0 w-full justify-center flex-col ${modalOpen ? 'flex z-50' : 'hidden'}`} >
        <div
          onClick={() => console.log('model')}
          className={`mx-auto flex flex-col shadow-lg bg-white rounded-2xl p-4 dark:bg-gray-700 w-96 h-36 ease-in duration-300 `}
          ref={refOfModal}
        ></div>
      </div>
      <div className={style.container + `${modalOpen ? ' blur-sm' : ''}`}>{children}</div>
    </div>;
  } else {
    //不在公共api中的就返回登录
    // return <></>
    return <Login ref={refOfModal} />;
  }
}

DashboardLayout.getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;
  const data = await (await fetch(`${host.api}/auth/getmenu`)).json(); //公共api
  // ctx.req.redirect(200, '/login/login')
  //console.log(ctx.req)
  console.log(user);
  return {
    props: {
      user: user,
    },
  };
});

export default DashboardLayout;
