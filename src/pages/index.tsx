import { NextPageContext } from 'next';
import Content from '../components/content';

export default function HomePage() {
  return <Content></Content>;
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
