import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../database';
import { Role, User } from '../../../database/model';
import { withDB } from '../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const role = await DataBase.manager.findOne(Role, {
    where: { id: body.role.id },
  });
  const user = new User(
    body.username,
    body.password,
    body.active,
    body.email,
    body.avatar,
    role!,
  );
  const data = await DataBase.manager.save(user);
  res.status(200).json(data);
};
export default withDB(handler);
