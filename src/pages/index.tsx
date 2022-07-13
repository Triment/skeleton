import Router from 'next/router';
import { useEffect } from 'react';
import { NextPageContext } from 'next'
import Content from '../components/content';

export default function HomePage() {
  
  return <Content></Content>;
}

export const getServerSideProps = ({ req, res}: NextPageContext )=>{
  res?.writeHead(301, {//首页设置为文件管理器
    Location: `/admin/filemanger`
  })
  res?.end()
  return {
    props: {}
  }
}