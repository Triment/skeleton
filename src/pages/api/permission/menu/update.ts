import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../../database';
import { Menu, Role } from '../../../../database/model';
import { withDB } from '../../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  try {
    await DataBase.createQueryBuilder()
      .update(Menu)
      .set({
        icon: body.icon,
        link: body.link,
        title: body.title,
      })
      .where({
        id: body.id,
      })
      .execute();
    res.status(200).json({ success: true });
  } catch (err) {
    console.log('错误', err);
  }
};
export default withDB(handler);
