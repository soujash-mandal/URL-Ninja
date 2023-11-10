import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "@clerk/clerk-react";
import CreateUrl from "../components/Home/CreateUrl";
import config from "../../config.json";
import "../styles/Home/UrlTable.css";
import "../styles/Home/NoUrl.css";
import UrlTable from "../components/Home/UrlTable";

const Home = () => {
  const [urls, setUrls] = useState([]);
  const { session } = useSession();

  const fetchAllUrls = async () => {
    const token = await session.getToken();
    try {
      const response = await axios.get(
        config.API_BASE_URL + "/api/v1/url/all",
        {
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

  const deleteUrl = async (urlId) => {
    try {
      const token = await session.getToken();
      await axios.delete(config.API_BASE_URL + "/api/v1/url", {
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

  useEffect(
    () => {
      fetchAllUrls();
    },
    // eslint-disable-next-line
    []
  );

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

  return (
    <div>
      <CreateUrl fetchAllUrls={fetchAllUrls}/>

      {urls.length ? (
        <UrlTable
          urls={urls}
          deleteUrl={deleteUrl}
          shareUrl={shareUrl}
          copyUrlToClipboard={copyUrlToClipboard}
        />
      ) : (
        <p className="no-url-message">You Don&apos;t have any URL</p>
      )}
    </div>
  );
};

export default Home;
