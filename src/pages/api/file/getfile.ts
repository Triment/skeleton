import { getFileFolder } from './getfiles';
import { resolve } from 'path';
import { createReadStream, existsSync, statSync } from 'fs';

import { Throttle } from 'stream-throttle';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  //runMiddleware(res,req,thorttle)
  const { getPath } = req.query;
  const stat = statSync(getPath as string);
  let filename = (getPath as string)!.split('/').pop();
  if (existsSync(getPath as string)) {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Length', stat.size);
    createReadStream(getPath as string)
      .pipe(new Throttle({ rate: 1024 * 500000 }))
      .pipe(res);
  }
};

export default handler;
