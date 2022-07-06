const allpost = [
  {
    id: 1,
    author: 'admin',
    content: 'this is a content',
    star: 56,
  },
];

const handler = (req, res) => {
  res.status(200).json(allpost);
};
export default handler;
