import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../../config.json";
import { useSession } from "@clerk/clerk-react";
import { ClipLoader } from "react-spinners";
import '../../styles/Drive/DrivePath.css'

// eslint-disable-next-line
const DrivePath = ({ id }) => {
  const [currentFolder, setcurrentFolder] = useState(id);
  const [parentFolderId, setparentFolderId] = useState("");
  const [parentFolderName, setparentFolderName] = useState("");
  const [loading, setloading] = useState(false);
  const { session } = useSession();

  const fetchFolder = async (folderId) => {
    if (folderId == "my-drive") {
      return { name: "" };
    }
    const token = await session.getToken();
    // console.log(token);
    const response = await axios.get(
      config.API_BASE_URL + "/api/v1/drive/folder",
      {
        params: {
          folderId: folderId,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = response.data;
    return data;
  };

  const setCurrentFolderNavigation = async () => {
    setloading(true);

    if (id == "my-drive") {
      setloading(false);
      return;
    }

    let FolderData = await fetchFolder(id);
    setcurrentFolder(FolderData.name);
    setparentFolderId(FolderData.parentFolder);

    let parentFolderData = await fetchFolder(FolderData.parentFolder);
    setparentFolderName(parentFolderData.name);
    setloading(false);
  };

  useEffect(() => {
    // Define the fetchData function
    const fetchData = async () => {
      await setCurrentFolderNavigation(id);
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

  while (loading) {
    return (
      <div className="loading-container">
        <ClipLoader size={50} color="#123abc" loading={true} />
      </div>
    );
  }
  // if (id == "my-drive") {
  //   return <div>my-drive</div>;
  // } else if (parentFolderId == "my-drive") {
  //   return (
  //     <div>
  //       <a href="my-drive">my-drive</a> / {currentFolder}
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="folder-path-container">
        {parentFolderId ? (
          parentFolderName ? (
            <span>
              .. / <a href={parentFolderId}>{parentFolderName}</a> /{" "}
            </span>
          ) : (
            <span>
              <a href={parentFolderId}>{parentFolderId}</a> /{" "}
            </span>
          )
        ) : (
          <span></span>
        )}
        <span>{currentFolder}</span>
        
      </div>

    </>
  );
};

export default DrivePath;
