import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../database';
import { Analysis, User } from '../../../database/model';
import { withDB } from '../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await DataBase.manager.findAndCount(Analysis, {
    order: { updatedAt: 'DESC' },
  });
  res.status(200).json(data);
};
export default withDB(handler);
