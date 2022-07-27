import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await fetch(`https://mdp-admin.yimidida.com/api/mdpEmp/getEmpWithoutUser?mobile=${req.query.mobile?req.query.mobile:""}&ymEmpCode=${req.query.ymEmpCode?req.query.ymEmpCode:""}&status=3`)
  const result = await data.json()
  res.send(result)
};

export default handler;
