const UrlModel = require("../../models/url");

const deleteUrl = async (req, res) => {
  const { email, userId } = req;

  res.status(200).json({ message: "deleted Successfully", email, userId });
};

module.exports = {
  deleteUrl,
};
