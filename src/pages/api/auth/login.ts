import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../../config';
import { DataBase } from '../../../database';
import { User } from '../../../database/model';
import { aesEncrypt } from '../../../database/model/user';
import { withSessionRoute } from '../../../lib/withSession';
import { UserType } from '../../../redux/userSlice';
import { withDB } from '../../../util/ApiWrapper';
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
  if (!queryUser?.active) {
    res.status(401).json({ msg: '账号未激活，请联系管理员' });
    return;
  }
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
