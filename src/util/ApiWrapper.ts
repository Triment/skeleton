import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../database';
import { Analysis } from '../database/model';
import { getCookie } from 'cookies-next';
import { getClientIp } from 'request-ip';

export const withDB =
  (handler: (req: NextApiRequest, res: NextApiResponse) => void) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (!DataBase.isInitialized) await DataBase.initialize();
    return handler(req, res);
  };
