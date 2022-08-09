import { useRouter } from 'next/router';
import { ComponentProps, useEffect } from 'react';
import useUser from '../lib/useUser';
import Main from './main';
import { useToggle } from './provider/context';
import { useModal } from './provider/modal';
import Overlay from './provider/overlay';
import SideNavigation from './sidenavigation';
import TopNavigation from './topnavigation';
import FrontTopNavigation from './topnavigation/front';
/*	w-[calc(100%-16rem)] class get the remain width of the main component from lg:viewport by subtracting
(the total width by the width of the side navigation component which is w-64 = 16rem)*/

const style = {
  open: 'lg:w-full',
  close: 'lg:pl-4 lg:w-[calc(100%-16rem)]',
  mainContainer: `flex flex-col w-full h-screen pl-0 lg:space-y-4`,
  container: `bg-gray-100 h-screen overflow-hidden relative lg:p-4`,
  main: `h-screen overflow-auto pb-36 pt-8 px-2 md:pb-8 md:pt-4 lg:pt-0`,
};

const publicMenus = [
  '/',
  '/auth/login',
  '/admin/manger/',
  '/admin/filemanger',
  '/admin/filespage'
];

function DashboardLayout({ children }: ComponentProps<'div'>) {
  const { user, mutateUser } = useUser({
    redirectIfFound: true,
  });
  const { open } = useToggle();
  const { modalOpen, refOfModal, show } = useModal();

  const { pathname, push } = useRouter();
  let ok = false;
  console.log(user, pathname);
  publicMenus.map((item) => {
    //公共api
    if (item === pathname) {
      ok = true;
      return;
    }
  });
  if (!!user?.role) {
    console.log(`进入遍历用户菜单`, user);
    user.role!.menus.map((item) => {
      if (item.link === pathname) {
        ok = true;
        return;
      }
    });
  }
  console.log(ok);
  if (ok) {
    if (user?.role && user?.role.raw !== 'guest') {
      return (
        <div className={style.container}>
          <div
            onClick={() => show()}
            className={`absolute justify-center w-full h-full ease-in duration-300 ${
              modalOpen ? 'flex z-50' : 'hidden'
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
          <div
            className={`flex items-start ${
              modalOpen ? ' blur-sm grayscale' : ''
            }`}
          >
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
    return (
      <div className={style.container}>
        {pathname !== '/auth/login' ? <FrontTopNavigation /> : null}
        <div
          className={`absolute inset-0 w-full justify-center flex-col ${
            modalOpen ? 'flex z-50' : 'hidden'
          }`}
        >
          <div
            onClick={() => console.log('model')}
            className={`mx-auto flex flex-col shadow-lg bg-white rounded-2xl p-4 dark:bg-gray-700 w-96 h-auto ease-in duration-300 `}
            ref={refOfModal}
          ></div>
        </div>
        <div
          className={
            style.container + `${modalOpen ? ' blur-sm grayscale' : ''}`
          }
        >
          {children}
        </div>
      </div>
    );
  } else {
    //不在公共api中的就返回登录
    const Redirect = () => {
      useEffect(() => {
        push('/auth/login');
      });
      return <></>;
    };
    return <Redirect />;
  }
}

export default DashboardLayout;
