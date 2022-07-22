import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../database';
import { Analysis } from '../../../database/model';
import { withDB } from '../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  let record = await DataBase.manager.findOne(Analysis, {
    where: { user_uuid: body.user_uuid },
  });
  if (!record) {
  } else {
    record.count += 1;
    record.last_browse = body.path;
  }
  console.log(record);
  await DataBase.manager.save(record);
  res.status(200).json(record);
};
export default withDB(handler);
