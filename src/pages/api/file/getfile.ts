import { createReadStream, existsSync, statSync } from 'fs';

import { NextApiRequest, NextApiResponse } from 'next';
import { Throttle } from 'stream-throttle';
import UrlEncode from 'urlencode';
import { withSessionRoute } from '../../../lib/withSession';
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  //runMiddleware(res,req,thorttle)
  const { getPath } = req.query;
  if (existsSync(getPath as string)) {
    const stat = statSync(getPath as string);
    let filename = (getPath as string)!.split('/').pop();
    if (filename?.split('.').pop()?.toLocaleLowerCase() !== '.md') {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${UrlEncode(filename!)}`,
      );
    }
    res.setHeader('Content-Length', stat.size);
    const rate =
      req.session && !!req.session.user
        ? req.session.user!.role.bandwidth
        : 500; //默认速率500kb
    createReadStream(getPath as string)
      .pipe(new Throttle({ rate: 1024 * rate }))
      .pipe(res);
  } else res.status(404).json({ msg: 'not found' });
};

export const config = {
  api: {
    responseLimit: false,
  },
};

export default withSessionRoute(handler);
