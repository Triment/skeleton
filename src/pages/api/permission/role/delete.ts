import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../../database';
import { Role } from '../../../../database/model';
import { withDB } from '../../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  try {
    await DataBase.createQueryBuilder()
      .delete()
      .from(Role)
      .where('id = :id', { id: body.id })
      .execute();
    res.status(200).json({ success: true, msg: `${body.id}已删除` });
  } catch (error) {
    res.status(200).json({ success: false, msg: `${body.id}未删除` });
  }
};

export default withDB(handler);
