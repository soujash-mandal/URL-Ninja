require("dotenv").config();
const secretKey = process.env.CLERK_SECRET_KEY;
const { default: axios } = require("axios");
const clerk = require("@clerk/clerk-sdk-node");
clerk.setClerkApiKey(secretKey);

// Define the middleware

const clerkMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;

  try {
    // Let's remove the "Bearer " part from the header
    const clerkToken = authorization.replace("Bearer ", "");
    const decodeInfo = clerk.decodeJwt(clerkToken);
    const userId = decodeInfo.payload.sub;

    // Fetch user information from the Clerk API with Axios
    const clerkApiUrl = "https://api.clerk.com/v1/users/" + userId;
    const response = await axios.get(clerkApiUrl, {
      headers: { Authorization: "Bearer " + secretKey }, // Replace with your secret key
    });

    // Attach the user information to the request object for use in subsequent route handlers
    req.email = response.data.email_addresses[0].email_address;
    req.userId = userId;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error decoding or retrieving user information:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = clerkMiddleware;
