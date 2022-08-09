import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await fetch(
    `https://opendata.baidu.com/api.php?query=${req.query.ip}\&co=&resource_id=6006&oe=utf8`,
  );
  const result = await data.json();
  res.send(result);
};

export default handler;
