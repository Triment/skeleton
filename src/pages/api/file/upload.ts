import { IncomingForm } from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import { config as globalConfig } from '../../../config';
import { withDB } from '../../../util/ApiWrapper';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
  //fields: { path: [ '/' ] }, files: { file:
  let result = new Map<string, string>();
  for (const filename of Object.keys((data as any).files)) {
    fs.renameSync(
      (data as any).files[filename][0].filepath,
      join(
        globalConfig.fileServerPath,
        (data as any).fields.path[0] as string,
        (data as any).files[filename][0].originalFilename,
      ),
    );
    result.set(filename, 'ok');
  }
  res.send(result);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withDB(handler);
