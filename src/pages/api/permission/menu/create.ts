import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../../database';
import { Menu } from '../../../../database/model';
import { withDB } from '../../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const menu = new Menu(body.title, body.icon, body.link);

  const data = await DataBase.manager.save(menu);
  res.status(200).json(data);
};
export default withDB(handler);
