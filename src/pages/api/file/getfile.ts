import { getFileFolder } from './getfiles';
import { resolve } from 'path';
import { createReadStream, existsSync, statSync } from 'fs';

import { Throttle } from 'stream-throttle';

const handler = (req, res) => {
  //runMiddleware(res,req,thorttle)
  const { getPath } = req.query;
  const stat = statSync(getPath);
  let filename = getPath.split('/').pop();
  if (existsSync(getPath)) {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Length', stat.size);
    createReadStream(getPath)
      .pipe(new Throttle({ rate: 1024 * 500000 }))
      .pipe(res);
  }
};

export default handler;
