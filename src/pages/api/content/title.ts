import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ title: '悠然东篱下' });
};

export default handler;
