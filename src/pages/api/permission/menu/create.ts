import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../../database';
import { Menu, Role } from '../../../../database/model';
import { withDB } from '../../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const menu = new Menu('用户管理', 'folder', '/admin/manger/user');

  const data = await DataBase.manager.save(menu);
  res.status(200).json(data);
};
export default withDB(handler);
