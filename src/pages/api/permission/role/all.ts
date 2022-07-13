import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../../database';
import { Role } from '../../../../database/model';
import { withDB } from '../../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await DataBase.getRepository(Role)
    .createQueryBuilder('role')
    .leftJoinAndSelect('role.menus', 'menus')
    .addSelect('role.raw')
    .addSelect('role.bandwidth')
    .getMany();;
  res.status(200).json(data);
};
export default withDB(handler);
