import { DataBase } from '../../../database';
import { Menu, User } from '../../../database/model';
import { aesEncrypt } from '../../../database/model/user';
import { withDB } from '../../../util/ApiWrapper';
import { sign, verify } from 'jsonwebtoken'
import { config } from '../../../config';
import { setCookie } from '../../../util/setCookie';
const handler = async (req, res) => {
  const { username, password } = JSON.parse(req.body)
  const queryUser = await DataBase.manager.findOneBy(User, {
    username: username
  });
  if (!!queryUser && aesEncrypt(password) == queryUser.password) {
    const { password, ...noPwData} = queryUser
    const token = sign(noPwData, config.tokenprivateKey, { algorithm: 'RS256' })
    setCookie(res, 'token', token, { maxAge: 60*60*24 })
    res.status(200).json({ user: noPwData })
  }
  res.status(401).json( { msg: '账号或密码错误' })
};
export default withDB(handler);
