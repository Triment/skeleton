import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../../lib/withSession';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!!req.session.user) {
    res.json(req.session.user);
  } else res.json({ 
    username: 'guest',
    role: {
      raw: 'guest',
      menus: [
        {
          title: '文件下载',
          link: '/admin/filemanger'
        }
      ]
    }
  });
};

export default withSessionRoute(handler);
