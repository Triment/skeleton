export const host = {
  api: 'http://localhost:3000/api',
};
export const config = {
  fileServerPath: '/web/文件目录',
  tokenPrivateKey: '/web/src/rsa_private_key.pem',
  tokenPublicKey: '/web/src/rsa_public_key.pem',
  //iron-session config
  sessionConfig: {
    password: 'FF153EC2-224F-438F-B526-D7653B6C8A4B',
    cookieName: 'app_user',
    cookieOptions: {
      secure: false,
    },
  },
  databaseConfig: {
    username: 'admin',
    password: 'admin@cd123',
    uri: 'db',
  },
};
