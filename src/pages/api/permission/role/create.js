import { DataBase } from '../../../../database';
import { Menu, Role } from '../../../../database/model';
import { withDB } from '../../../../util/ApiWrapper';

const handler = async (req, res) => {
  const role = new Role('角色1');

  const data = await DataBase.manager.save(role);
  res.status(200).json(data);
};
export default withDB(handler);
