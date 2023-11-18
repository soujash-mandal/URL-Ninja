import axios from "axios";
import { getPreviewMetadata } from "../../utils/getPreviewMetadata";
import { useSession } from "@clerk/clerk-react";
import config from "../../../config.json";
import { useParams } from "react-router-dom";
import { useState } from "react";

// eslint-disable-next-line
const CreateFolderAndUrl = ({ fetchAllUrls, fetchAllFolders }) => {
  const { session } = useSession();
  const { id } = useParams();

  const [uploading, setuploading] = useState(false);
  const [uploadMessage, setuploadMessage] = useState("");

  const handleCreateFolder = async (e) => {
    setuploading(true);
    e.preventDefault();
    const newFolderName = prompt("Enter folder name:");
    if (newFolderName == null) {
      setuploading(false);
    }
    // Check if the URL input is empty or contains only whitespace
    if (newFolderName.trim() === "") {
      setuploading(false);
      setuploadMessage("❌ Folder should not be empty");

      return; // Do not proceed with the API request
    }

    try {
      // Get the user's session token
      const token = await session.getToken();

      // Make a POST request to the API to create a new URL
      const response = await axios.post(
        `${config.API_BASE_URL}/api/v1/drive/folder`,
        {
          name: newFolderName,
          parentFolder: id,
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

      // Display an alert with the message from the API response
      setuploadMessage(data.message);
      setuploading(false);
      // // Fetch all URLs again to update the UI
      fetchAllFolders();
    } catch (error) {
      // Handle any errors that occur during the API request
      console.log("Error: " + error);
    }
  };

  const handleCreateUrl = async (e) => {
    setuploading(true);
    e.preventDefault();
    const newLinkUrl = prompt("Enter new URL:");
    if (newLinkUrl == null) {
      setuploading(false);
    }
    // Check if the URL input is empty or contains only whitespace
    if (newLinkUrl.trim() === "") {
      setuploadMessage("❌ URL should not be empty");
      setuploading(false);
      return; // Do not proceed with the API request
    }

    try {
      // Fetch the preview metadata
      const previewData = await getPreviewMetadata(newLinkUrl);

      // Get the user's session token
      const token = await session.getToken();

      // Make a POST request to the API to create a new URL
      const response = await axios.post(
        `${config.API_BASE_URL}/api/v1/drive/url`,
        {
          originalUrl: newLinkUrl,
          image: previewData.image,
          title: previewData.title,
          site_name: previewData.site_name,
          description: previewData.description,
          parentFolder: id,
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

      // alert(data.message);
      setuploadMessage(data.message);
      fetchAllUrls();
      setuploading(false);
    } catch (error) {
      // Handle any errors that occur during the API request
      console.log("Error: " + error);
    }
  };

  while (uploading) {
    return <>Uploading ...</>;
  }

  return (
    <>
      <div>
        <button onClick={handleCreateFolder} className="btn-drive">
          New Folder
        </button>
        <button onClick={handleCreateUrl} className="btn-drive">
          New URL
        </button>
      </div>
      <div style={{ paddingTop: "20px" }}>{uploadMessage}</div>
    </>
  );
};

export default CreateFolderAndUrl;
