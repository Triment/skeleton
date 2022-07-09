import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../database';
import { User } from '../../../database/model';
import { withDB } from '../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = JSON.parse(req.body);
  if (!!username) {
    const queryUser = await DataBase.getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.menus', 'menus')
      .addSelect('user.password')
      .where('user.username = :username', { username: username })
      .getOne();

    res.status(200).json(queryUser);
  }
};
export default withDB(handler);
