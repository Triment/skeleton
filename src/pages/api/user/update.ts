import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../database';
import { User } from '../../../database/model';
import { withDB } from '../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, ...other } = JSON.parse(req.body);
  console.log(other)
  if (!!id) {
    const queryUser = await DataBase.getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.menus', 'menus')
      .where('user.id = :id', { id: id })
      .getOne();
    queryUser!.username = other.username
    if (!!other.password && other.password.length > 0)
        queryUser!.password = other.password
    queryUser!.role.bandwidth = other.role.bandwidth
    try{
      await DataBase.manager.save(queryUser)
    }catch(error){
      console.log(`error:`, error)
    }
    
    res.status(200).json(queryUser);
  }
};
export default withDB(handler);
