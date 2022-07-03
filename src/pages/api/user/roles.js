const allrole = ['admin', 'user', 'guest'];

const handler = (req, res) => {
  res.status(200).json(allrole);
};
export default handler;
