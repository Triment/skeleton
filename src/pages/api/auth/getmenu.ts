import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../database';
import { Menu } from '../../../database/model';
import { withDB } from '../../../util/ApiWrapper';
import { withAuth } from '../../../util/withAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await DataBase.manager.find(Menu);
  res.status(200).json(data);
};
export default withAuth(withDB(handler));
