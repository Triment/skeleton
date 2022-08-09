import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';



export default function HomePage() {
  const { push } = useRouter();
  const Redirect = () => {
    useEffect(() => {
      push('/auth/login');
    });
    return <></>;
  };
  return <Redirect />;
}

export const getServerSideProps = ({ req, res }: NextPageContext) => {
  res?.writeHead(301, {
    //首页设置为文件管理器
    Location: `/admin/filespage?fullpath=/`,
  });
  res?.end();
  return {
    props: {},
  };
};
