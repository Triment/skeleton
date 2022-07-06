import Main from './main';
import Overlay from './provider/overlay';
import TopNavigation from './topnavigation';
import SideNavigation from './sidenavigation';
import { useToggle } from './provider/context';
import { useModal } from './provider/model';
import { useRouter } from 'next/router';
import { ComponentProps } from 'react';
import { useSelector } from 'react-redux';
import { GlobalStore } from '../redux/store';
import { User } from '../database/model';
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
  '/', '/login/login'
]

export default function DashboardLayout({ children }: ComponentProps<'div'>) {
  const { open } = useToggle();
  const { modalOpen, refOfModal, show } = useModal();
 
  const { pathname } = useRouter()
  const user = useSelector(state => (state as GlobalStore).userInfo.user)
  const ok = false
  publicMenus.map(item=>{//公共api
    if (item === pathname){
      ok == ok || true
    }
  })
  if (!!user){
    user.role!.menus.map((item)=>{
      if (item.link === pathname){
        ok == ok || true
      }
    })
  }
  // 获取
  if (ok) {
    //管理界面
    if (!!user) {
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
                className={`shadow-lg bg-white rounded-2xl p-4 dark:bg-gray-700 w-96 h-auto ease-in duration-300 `}
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
              {/* <TopNavigation /> */}
              <Main className={style.main}>{children}</Main>
            </div>
          </div>
        </div>
      );
    }
    //对于匿名者显示界面
    return <div className={style.container}>{children}</div>
  } else {
    //不在公共api中的就返回登录
    return <div
    onClick={(e) => {
        e.preventDefault();
    }}
    className="h-full h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8"
>
    <div className="max-w-md w-full">
        <form className="mt-8 space-y-6" action="#" method="POST">
            <span>登陆</span>
            <div className="rounded-md shadow-sm -space-y-px space-y-2">
                <div>
                    <label htmlFor="email-address" className="sr-only">
                        账号
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="账号"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        秘密
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="密码"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                    >
                        {' '}
                        记住我{' '}
                    </label>
                </div>

                <div className="text-sm">
                    <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        {' '}
                        重置密码{' '}
                    </a>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg
                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                    登录
                </button>
            </div>
        </form>
    </div>
</div>
  }
}
