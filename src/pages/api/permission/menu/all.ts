import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../../database';
import { Menu, Role } from '../../../../database/model';
import { withDB } from '../../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await DataBase.manager.find(Menu);
  res.status(200).json(data);
};
export default withDB(handler);
