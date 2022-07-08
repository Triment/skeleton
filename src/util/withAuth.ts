import { readFileSync } from 'fs';
import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../config';

export const withAuth =
  (handler: (req: NextApiRequest, res: NextApiResponse) => void) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (!!req.cookies['token']) {
      const user = verify(
        req.cookies['token'],
        readFileSync(config.tokenPublicKey),
        { algorithms: ['RS256'] },
      );
      console.log('解析数据', user);
    }

    return handler(req, res);
  };
