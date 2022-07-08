import { useState } from 'react';
import { host } from '../../config';

export const Login: React.FC<{}> = () => {
  const [loginForm, setForm] = useState<{ username: string; password: string }>(
    { username: '', password: '' },
  );
  const submit = () => {
    fetch(`${host.api}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(loginForm),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div
      onClick={(e) => {
        e.preventDefault(); //阻止事件冒泡
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
                onChange={(e) =>
                  setForm({ ...loginForm, username: e.currentTarget.value })
                }
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
                onChange={(e) =>
                  setForm({ ...loginForm, password: e.currentTarget.value })
                }
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
              onClick={submit}
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
  );
};
