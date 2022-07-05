import { DataBase } from '../../../database';
import { Menu } from '../../../database/model';
import { withDB } from '../../../util/ApiWrapper';

const handler = async (req, res) => {
  const data = await DataBase.manager.find(Menu);
  console.log(data);
  res.status(200).json(data);
};
export default withDB(handler);
