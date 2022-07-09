import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../database';
import { User } from '../../../database/model';
import { withDB } from '../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await DataBase.getRepository(User)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.role', 'role')
    .addSelect('role.raw')
    .getMany();
  res.status(200).json(data);
};
export default withDB(handler);
