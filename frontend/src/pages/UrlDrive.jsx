import { useSession, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import CreateFolderAndUrl from "../components/UrlDrive/CreateFolderAndUrl";
import { useParams } from "react-router-dom";
import UrlTable from "../components/Home/UrlTable";
import FolderList from "../components/UrlDrive/DriveFolderList";
// import { ClipLoader } from "react-spinners";
import DrivePath from "../components/UrlDrive/DrivePath";

const UrlDrive = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setloading] = useState(false);
  const [urls, setUrls] = useState([]);
  const { session } = useSession();
  const { id } = useParams();
  const { isLoaded, isSignedIn } = useUser();

  const deleteUrl = async (urlId) => {
    try {
      const token = await session.getToken();
      await axios.delete(config.API_BASE_URL + "/api/v1/drive/url", {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: { urlId },
      });
      // Fetch the updated list of URLs after deletion
      fetchAllUrls();
    } catch (error) {
      // Handle any errors here
    }
  };

  const deleteFolder = async (folderId) => {
    try {
      const token = await session.getToken();
      await axios.delete(config.API_BASE_URL + "/api/v1/drive/folder", {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: { folderId },
      });
      // Fetch the updated list of URLs after deletion
      fetchAllFolders();
    } catch (error) {
      // Handle any errors here
    }
  };

  const shareUrl = async (text) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Share this URL",
          text: text,
        });
      } else {
        alert("Sharing is not supported on this device/browser.");
      }
    } catch (error) {
      console.error("Error sharing URL:", error);
    }
  };

  const copyUrlToClipboard = (text) => {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("URL copied to clipboard.");
  };

  const fetchAllUrls = async () => {
    setloading(true);
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
    setloading(false);
  };

  const fetchAllFolders = async () => {
    setloading(true);
    const token = await session.getToken();
    // console.log(token);
    try {
      const response = await axios.get(
        config.API_BASE_URL + "/api/v1/drive/folder/all",
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
    setloading(false);
  };

  useEffect(() => {
    // Define the fetchData function
    const fetchData = async () => {
      await fetchAllFolders();
      await fetchAllUrls();
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

  while (!isLoaded) {
    return (
      <>
        <DrivePath id={id} session={session} />
        <div className="container">
          <CreateFolderAndUrl
            fetchAllFolders={fetchAllFolders}
            fetchAllUrls={fetchAllUrls}
          />
          <>Loading...</>
        </div>
      </>
    );
  }
  while (!isSignedIn) {
    return (
      <div className="container">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "100px", paddingTop: "150px" }}
        >
          cloud_upload
        </span>
        You are not logged in
      </div>
    );
  }

  return (
    <>
      <DrivePath id={id} session={session} />
      <div className="container">
        <CreateFolderAndUrl
          fetchAllFolders={fetchAllFolders}
          fetchAllUrls={fetchAllUrls}
        />
        {/* case when both folder and urls does not exist */}
        {loading ? (
          <>Loading...</>
        ) : !folders?.length && !urls?.length ? (
          <>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "100px", paddingTop: "150px" }}
            >
              cloud_upload
            </span>
            Empty Folder
          </>
        ) : (
          <></>
        )}
        {/* Folder List */}
        {folders?.length ? (
          <FolderList folders={folders} deleteFolder={deleteFolder} />
        ) : (
          <></>
        )}

        {/* Url List */}
        <div>
          {urls?.length ? (
            <UrlTable
              urls={urls}
              deleteUrl={deleteUrl}
              shareUrl={shareUrl}
              copyUrlToClipboard={copyUrlToClipboard}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default UrlDrive;
