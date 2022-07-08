import { DataBase } from '../../../database';
import { User } from '../../../database/model';
import { withDB } from '../../../util/ApiWrapper';

const handler = async (req, res) => {
  const user = new User('林帅', 'admin@cd123', true, '13198898368@163.com');

  const data = await DataBase.manager.save(user);
  res.status(200).json(data);
};
export default withDB(handler);