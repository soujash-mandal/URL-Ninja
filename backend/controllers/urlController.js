// controllers/url controller.js

const createUrl = (req, res) => {
  const { userId } = req.body;
  const newUser = { id: Date.now(), username };
  users.push(newUser);
  res.json(newUser);
};

const getUrls = (req, res) => {
  res.json(users);
};

module.exports = {
  createUrl,
  getUrls,
};
