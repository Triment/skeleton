const menus = [
  {
    title: '文件下载',
    link: '/admin/filemanger',
  },
  // {
  //     title: '博客',
  //     link: '/admin/blog',
  // },
  // {
  //     title: '用户管理',
  //     link: '/admin/manger/user',
  // }
];

const handler = (req, res) => {
  res.status(200).json(menus);
};
export default handler;
