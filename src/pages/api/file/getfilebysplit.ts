import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import { config as globalConfig } from '../../../config';
import { withDB } from '../../../util/ApiWrapper';

export const getFileFolder = () => {
  return globalConfig.fileServerPath;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const filepath = join(getFileFolder(), req.query.fullpath as string);
  var data = [];
  for (const t of fs.readdirSync(filepath)) {
    data.push({
      name: t,
      type: fs.statSync(join(filepath, t)).isDirectory() ? 'folder' : 'file',
      children: fs.statSync(join(filepath, t)).isDirectory()
        ? fs.readdirSync(join(filepath, t)).reverse()
        : [],
      fullpath: join(req.query.fullpath as string, t),
    });
  }
  res.status(200).json(data);
};

export const config = {
  api: {
    responseLimit: false,
  },
};

export default withDB(handler);
