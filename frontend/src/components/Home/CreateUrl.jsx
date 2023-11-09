import { useState } from "react";
import axios from "axios";
import { useSession } from "@clerk/clerk-react";
import config from "../../../config.json";
import "../../styles/Home/CreateUrl.css"; // Import the CSS file

const CreateUrl = () => {
  const { session } = useSession();
  const [url, setUrl] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // State for the alert message

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (url.trim() === "") {
      // Check if the URL input is empty or contains only whitespace
      setAlertMessage("URL should not be empty");
      return; // Do not proceed with the API request
    }

    try {
      const token = await session.getToken();
      const response = await axios.post(
        `${config.API_BASE_URL}/api/v1/url`,
        { originalUrl: url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
      // Handle the data here

      // Reset the alert message
      setAlertMessage("");
      alert(data.message);

      // Refresh the page to load updated content
      window.location.reload();
    } catch (error) {
      // Handle any errors here
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="url"
          name="url"
          placeholder="Enter your URL here"
          onChange={handleUrlChange}
          className="input"
        />
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
      {alertMessage && <div className="alert">{alertMessage}</div>}
    </div>
  );
};

export default CreateUrl;
