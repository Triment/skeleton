import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../../lib/withSession';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();
  res.json({ action: 'logout', success: true });
};

export default withSessionRoute(handler);
