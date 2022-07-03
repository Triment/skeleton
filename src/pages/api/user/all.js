const alluser = [
  {
    id: 1,
    username: 'user',
    active: true,
    avatar:
      'https://res.cloudinary.com/beloved/image/upload/v1623599101/Assets/ilunga_xrvvfm.jpg',
    role: 'guest',
    email: 'test@lins.link',
  },
  {
    id: 2,
    username: 'admin',
    active: false,
    avatar:
      'https://res.cloudinary.com/beloved/image/upload/v1623599101/Assets/ilunga_xrvvfm.jpg',
    role: 'admin',
    email: 'test@lins.link',
  },
  {
    id: 3,
    username: 'vip',
    active: true,
    avatar:
      'https://res.cloudinary.com/beloved/image/upload/v1623599101/Assets/ilunga_xrvvfm.jpg',
    role: 'user',
    email: 'test@lins.link',
  },
];

const handler = (req, res) => {
  res.status(200).json(alluser);
};
export default handler;
