import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../../database';
import { Menu, Role } from '../../../../database/model';
import { withDB } from '../../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const role = new Role(body.raw);
  role.bandwidth = body.bandwidth;
  var Menus: Menu[];
  Menus = [];
  for (let item of body.menus) {
    const menu = (await DataBase.getRepository(Menu)
      .createQueryBuilder('menu')
      .where('menu.id=:id', { id: item.id })
      .getOne())!;
    DataBase.manager.update;
    Menus.push(menu);
  }
  role.menus = Menus;
  const data = await DataBase.manager.save(role);
  res.status(200).json(data);
};
export default withDB(handler);
