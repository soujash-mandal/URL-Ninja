// Import necessary dependencies and styles
import { useState } from "react";
import axios from "axios";
import { useSession } from "@clerk/clerk-react";
import config from "../../../config.json";
import "../../styles/Home/CreateUrl.css"; // Import the CSS file
import { getPreviewMetadata } from "../../utils/getPreviewMetadata";

// eslint-disable-next-line
const CreateUrl = ({ fetchAllUrls }) => {
  // Use Clerk's useSession hook to access user session information
  const { session } = useSession();

  // State to manage the URL input and alert message
  const [url, setUrl] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // State for the alert message
  // const [image, setimage] = useState("");
  // const [title, settitle] = useState("");
  // const [description, setdescription] = useState("");
  // const [site_name, setsite_name] = useState("");

  // Event handler for URL input change
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the URL input is empty or contains only whitespace
    if (url.trim() === "") {
      setAlertMessage("URL should not be empty");
      return; // Do not proceed with the API request
    }

    try {
      // Fetch the preview metadata
      const previewData = await getPreviewMetadata(url);

      // Get the user's session token
      const token = await session.getToken();

      // Make a POST request to the API to create a new URL
      const response = await axios.post(
        `${config.API_BASE_URL}/api/v1/url`,
        {
          originalUrl: url,
          image: previewData.image,
          title: previewData.title,
          site_name: previewData.site_name,
          description: previewData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Extract data from the API response
      const data = response.data;
      console.log(data);

      // Reset the alert message
      setAlertMessage("");

      // Display an alert with the message from the API response
      alert(data.message);

      // Fetch all URLs again to update the UI
      fetchAllUrls();

      // Reset the URL input field
      setUrl("");
    } catch (error) {
      // Handle any errors that occur during the API request
      console.log("Error: " + error);
    }
  };

  // Render the component with a form for creating a URL
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="url"
          name="url"
          placeholder="Enter your URL here"
          onChange={handleUrlChange}
          value={url}
          className="input"
        />
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>

      {/* Display an alert message if there is one */}
      {alertMessage && <div className="alert">{alertMessage}</div>}
    </div>
  );
};

// Export the CreateUrl component
export default CreateUrl;
