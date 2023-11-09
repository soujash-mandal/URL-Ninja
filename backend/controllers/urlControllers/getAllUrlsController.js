const UrlModel = require("../../models/url");

const getAllUrls = async (req, res) => {
  const { email, userId } = req;

  res.status(200).json({ message: "fetched all urls", email, userId });
};

module.exports = {
  getAllUrls,
};
