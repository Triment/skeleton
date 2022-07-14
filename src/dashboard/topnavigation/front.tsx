import Link from 'next/link';
import { useRouter } from 'next/router';
import fetchJson from '../../lib/fetchJson';
import useUser from '../../lib/useUser';
import { useToggle } from '../provider/context';

export default function TopNavigation() {
  const { toggle } = useToggle();
  const { user, mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });
  const router = useRouter();
  return (
    <header className="bg-white h-16 items-center relative shadow w-full z-10 md:h-20 lg:rounded-2xl">
      <div className="flex flex-center flex-col h-full justify-center mx-auto px-3 relative">
        <div className="flex items-center pl-1 relative w-full sm:pr-2 sm:ml-0 lg:max-w-68">
          <div className="flex h-full left-0 relative w-3/4"></div>
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
            className="flex cursor-pointer items-center justify-end ml-5 p-1 relative w-1/4 sm:mr-0 sm:right-auto hover:text-blue-500"
          >
            <Link href="/auth/login">登录</Link>{' '}
          </div>
        </div>
      </div>
    </header>
  );
}
