import { DataBase } from '../../../database';
import { User } from '../../../database/model';
import { withDB } from '../../../util/ApiWrapper';

const handler = async (req, res) => {
  const data = await DataBase.manager.find(User);
  res.status(200).json(data);
};
export default withDB(handler);
