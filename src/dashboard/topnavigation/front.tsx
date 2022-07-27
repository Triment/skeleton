import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function TopNavigation() {
  const router = useRouter();
  useEffect(() => {
    console.log(router);
  });
  return (
    <header className="bg-white h-16 items-center relative shadow w-full z-10 md:h-20 lg:rounded-2xl">
      <div className="flex flex-center flex-col h-full justify-center mx-auto px-3 relative">
        <div className="flex items-center pl-1 relative w-full sm:pr-2 sm:ml-0 lg:max-w-68">
          <div className="flex h-full left-0 relative w-3/4"></div>
          <Link href="/admin/tools/mdp" className="break-normal">
            <div
              className={`flex cursor-pointer items-center break-words justify-end ml-5 p-1 relative w-auto sm:mr-0 sm:right-auto ${
                router.pathname.startsWith('/admin/tools/mdp')
                  ? 'text-blue-500 '
                  : 'text-gray-500'
              } hover:text-blue-700`}
            >
              集团工号查询
            </div>
          </Link>
          <Link href="/admin/filespage?fullpath=/" className="break-normal">
            <div
              className={`flex cursor-pointer items-center break-words justify-end ml-5 p-1 relative w-auto sm:mr-0 sm:right-auto ${
                router.pathname.startsWith('/admin/filespage')
                  ? 'text-blue-500 '
                  : 'text-gray-500'
              } hover:text-blue-700`}
            >
              文件下载
            </div>
          </Link>
          {/* admin/filespage?fullpath=/ */}
          <Link href="/auth/login">
            <div
              // onClick={async (e) => {
              //   e.preventDefault();
              //   mutateUser(
              //     await fetchJson('/api/auth/logout', {
              //       method: 'POST',
              //     }),
              //     false,
              //   );
              //   router.push('/admin/filemanger')
              // }}
              className={`flex cursor-pointer items-center break-words justify-end ml-5 p-1 relative w-auto sm:mr-0 sm:right-auto text-gray-500 hover:text-blue-700`}
            >
              登录{' '}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
