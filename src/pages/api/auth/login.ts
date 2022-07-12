import { DataBase } from '../../../database';
import { Menu, User } from '../../../database/model';
import { aesEncrypt } from '../../../database/model/user';
import { withDB } from '../../../util/ApiWrapper';
import { sign, verify } from 'jsonwebtoken';
import { config } from '../../../config';
import { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';
import { UserStore, UserType } from '../../../redux/userSlice';
import { withSessionRoute } from '../../../lib/withSession';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = JSON.parse(req.body);
  const queryUser = await DataBase.getRepository(User)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.role', 'role')
    .leftJoinAndSelect('role.menus', 'menus')
    .addSelect('user.password')
    .addSelect('role.raw')
    .addSelect('role.bandwidth')
    .where('user.username = :username', { username: username })
    .getOne();
  // (User, {
  //   select: ['role', 'active', 'email', 'id', 'username', 'password'],
  //   where: { username: username },
  //   join:
  // });
  if (!!queryUser && aesEncrypt(password) == queryUser.password) {
    const { password, ...noPwData } = queryUser;
    const token = sign(noPwData, readFileSync(config.tokenPrivateKey), {
      algorithm: 'RS256',
    });
    //setCookie(res, 'token', token, { maxAge: 60 * 60 * 24 }); //设置cookie保持1天
    req.session.user = noPwData as unknown as UserType;
    await req.session.save();
    res.status(200).json({ user: noPwData });
    return;
  }
  res.status(401).json({ msg: '账号或密码错误' });
};
export default withSessionRoute(withDB(handler));
