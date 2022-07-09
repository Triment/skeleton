import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../../database';
import { Menu, Role, User } from '../../../../database/model';
import { withDB } from '../../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const loginPage = new Menu('登录', 'folder', '/auth/login');
  const homePage = new Menu('主页', 'home', '/');
  const fileDown = new Menu('文件下载', 'folder', '/admin/filemanger');
  const adminMange = new Menu('管理用户', 'folder', '/admin/manger/user');
  const role = new Role('管理员');
  role.menus = [fileDown, adminMange];
  await DataBase.manager.save(fileDown);
  await DataBase.manager.save(loginPage);
  await DataBase.manager.save(homePage);
  await DataBase.manager.save(adminMange);
  const user = new User(
    'admin',
    'admin@cd123',
    true,
    '13198898368@163.com',
    role,
  );
  user.role = role;
  await DataBase.manager.save(role);
  res.status(200).json(await DataBase.manager.save(user));
};
export default withDB(handler);
