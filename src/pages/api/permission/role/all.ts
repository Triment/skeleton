import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../../database';
import { Role } from '../../../../database/model';
import { withDB } from '../../../../util/ApiWrapper';

const allrole = ['admin', 'user', 'guest'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await DataBase.manager.find(Role);
  res.status(200).json(data);
};
export default withDB(handler);
