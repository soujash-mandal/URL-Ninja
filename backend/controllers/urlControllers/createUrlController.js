const UrlModel = require("../../models/url");
const shortid = require("shortid");

const createUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const { email, userId } = req;

  // Check if the URL already exists in the database
  const existingUrl = await UrlModel.findOne({ originalUrl });

  if (existingUrl) {
    console.log(existingUrl);
    res.json(existingUrl);
  } else {
    // Generate a unique short ID
    const shortUrl = shortid.generate();

    // Save the URL data to the database
    const newUrl = new UrlModel({
      originalUrl,
      shortUrl,
      userId,
      email,
      clicks: 0,
    });
    await newUrl.save();

    console.log(newUrl);
    res.json(newUrl);
  }
};

module.exports = {
  createUrl,
};
