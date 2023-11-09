const UrlModel = require("../../models/url");

const getUrl = async (req, res) => {
  const { email, userId } = req;

  console.log(email);
  res.status(200).json(email);
};

module.exports = {
  getUrl,
};
