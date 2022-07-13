import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../../database';
import { Menu, Role } from '../../../../database/model';
import { withDB } from '../../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const allRole = await DataBase.getRepository(Role)
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.menus', 'menus')
      .getMany();
  res.status(200).json(allRole);
};
export default withDB(handler);
