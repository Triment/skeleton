import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../../database';
import { Menu, Role, User } from '../../../../database/model';
import { withDB } from '../../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const count = await DataBase.manager.count(User, {});
  if (count > 0) {
    res.status(401).json({ sucess: false, msg: '无此权限' }); //仅仅允许初始化一次
    return;
  }
  const loginPage = new Menu('登录', 'folder', '/auth/login');
  const homePage = new Menu('主页', 'home', '/');
  const fileDown = new Menu('文件下载', 'folder', '/admin/filemanger');
  const adminUserMange = new Menu('管理用户', 'folder', '/admin/manger/user');
  const adminRoleMange = new Menu('角色管理', 'folder', '/admin/manger/role');
  const adminMenuMange = new Menu('菜单管理', 'folder', '/admin/manger/menu');
  const role = new Role('管理员');
  role.menus = [fileDown, adminUserMange, adminRoleMange, adminMenuMange];
  const user = new User(
    'admin',
    'admin@cd123',
    true,
    '13198898368@163.com',
    '',
    role,
  );
  await DataBase.manager.save([
    adminUserMange,
    adminRoleMange,
    fileDown,
    homePage,
    loginPage,
    role,
  ]);
  res.status(200).json(await DataBase.manager.save(user));
};
export default withDB(handler);
