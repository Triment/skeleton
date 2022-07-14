import { getFileFolder } from './getfiles';
import { resolve } from 'path';
import { createReadStream, existsSync, statSync } from 'fs';

import { Throttle } from 'stream-throttle';
import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../../lib/withSession';
import UrlEncode from 'urlencode';
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  //runMiddleware(res,req,thorttle)
  const { getPath } = req.query;
  const stat = statSync(getPath as string);
  let filename = (getPath as string)!.split('/').pop();
  if (existsSync(getPath as string)) {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename*=UTF-8${UrlEncode(filename!)}`,
    );
    res.setHeader('Content-Length', stat.size);
    const rate =
      req.session && !!req.session.user
        ? req.session.user!.role.bandwidth
        : 500; //默认速率500kb
    createReadStream(getPath as string)
      .pipe(new Throttle({ rate: 1024 * rate }))
      .pipe(res);
  }
};

export default withSessionRoute(handler);
