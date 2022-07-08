import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../database';

export const withDB =
  (handler: (req: NextApiRequest, res: NextApiResponse) => void) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (!DataBase.isInitialized) await DataBase.initialize();
    return handler(req, res);
  };
