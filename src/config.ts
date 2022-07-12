export const host = {
  api: 'http://localhost:3000/api',
};
export const config = {
  fileServerPath: '/Volumes/Untitled',
  tokenPrivateKey: '/Users/triment/Desktop/skeleton/src/rsa_private_key.pem',
  tokenPublicKey: '/Users/triment/Desktop/skeleton/src/rsa_public_key.pem',
  //iron-session config
  sessionConfig: {
    password: 'FF153EC2-224F-438F-B526-D7653B6A8A4B',
    cookieName: 'app_user',
    cookieOptions: {
      secure: false,
    },
  },
  databaseConfig: {
    username: 'admin',
    password: 'admin@cd123',
    uri: 'localhost',
  },
};
