import { useSession } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import CreateFolderAndUrl from "../components/UrlDrive/CreateFolderAndUrl";
import { useParams } from "react-router-dom";

const UrlDrive = () => {
  const [folders, setFolders] = useState([]);
  const [urls, setUrls] = useState([]);
  const { session } = useSession();
  const { id } = useParams();
  console.log(id);

  const fetchAllUrls = async () => {
    const token = await session.getToken();
    try {
      const response = await axios.get(
        config.API_BASE_URL + "/api/v1/drive/url",
        {
          params: {
            parentFolder: id,
          },
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = response.data;
      setUrls(data);
    } catch (error) {
      // Handle any errors here
    }
  };

  const fetchAllFolders = async () => {
    const token = await session.getToken();
    console.log(token);
    try {
      const response = await axios.get(
        config.API_BASE_URL + "/api/v1/drive/folder",
        {
          params: {
            parentFolder: id,
          },
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = response.data;
      setFolders(data);
    } catch (error) {
      // Handle any errors here
    }
  };

  useEffect(() => {
    // Define the fetchData function
    const fetchData = async () => {
      await fetchAllUrls();
      await fetchAllFolders();
    };

    // Call the fetchData function when the component mounts
    fetchData();

    // Add an event listener for the beforeunload event
    window.addEventListener("beforeunload", fetchData);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", fetchData);
    };
  }, [session]); // Include session as a dependency to re-run effect when session changes

  return (
    <div>
      <CreateFolderAndUrl />

      {/* Folder List */}
      <div>
        <h2>Folders</h2>
        <ul>
          {folders.map((folder, index) => (
            <li key={index}>
              <a href={folder._id}>{folder.name}</a>
            </li>
          ))}
        </ul>
      </div>
      {/* Url List */}
      <div>
        <h2>Urls</h2>
        <ul>
          {urls.length ? (
            urls.map((url, index) => (
              <li key={index}>
                <a href={url.originalUrl}>
                {url.originalUrl}</a>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UrlDrive;
