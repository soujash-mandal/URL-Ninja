// UrlCard.js
import { useEffect, useState } from "react";
import "../../styles/Home/UrlCard.css"; // Import the CSS file
import axios from "axios";
import { Link } from 'react-router-dom';

// eslint-disable-next-line
const UrlCard = ({ url, deleteUrl, shareUrl, copyUrlToClipboard }) => {
  const [image, setimage] = useState(null);
  const [title, settitle] = useState("");
  const [site_name, setsite_name] = useState("");

  const formatCreatedAt = (createdAt) => {
    const options = {
      // hour: "numeric",
      // minute: "numeric",
      // hour12: true,
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    const formattedDate = new Date(createdAt).toLocaleString(
      undefined,
      options
    );

    return formattedDate;
  };

  const getPreviewLink = async (url) => {
    try {
      const preview = await axios.get(
        "https://url-metadata.onrender.com/?url=" + url
      );
      const data = preview.data;
      console.log(data.image);
      setimage(data.image);
      settitle(data.title);
      setsite_name(data.site_name);
    } catch (error) {
      console.log("Failed to get preview link");
    }
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line
      getPreviewLink(url.originalUrl);
    };
  }, [url]);

  return (
    
    <div className="url-card">
      <div className="url-details">
        <div className="url-info">
          <div>
            {/* {
              <iframe
                src={url.originalUrl}
                title="W3Schools Free Online Web Tutorials"
              ></iframe>
            } */}
            <Link to={url.originalUrl}>
            {image ? (
              <img src={image} width={300} height={150}></img>
            ) : (
              <iframe
                src={url.originalUrl}
                
              ></iframe>
            )}</Link>
          </div>
          <div className="url-desc">
            <div className="site_name-div">
              <div>
                <h2 className="site_name">
                  {site_name ? site_name : "No Site Name"}
                </h2>
              </div>
              <div>
                <h2 className="click_count">{url.clicks}</h2>
              </div>
            </div>
            <div>
              <h4 className="title">{title ? title : "No Title"}</h4>
            </div>
            <div>
              {/* <strong>Original URL:</strong>  */}
              {url.originalUrl}
            </div>
            <div className="id-date-div">
              <div style={{ paddingRight: "20px" }}>
                {/* <strong>Short URL ID :</strong>  */}
                <strong>{`${url.shortUrl}`}</strong>
              </div>
              <div className="createdAt">
                {/* <strong>Created At:</strong>  */}
                <strong>{formatCreatedAt(url.createdAt)}</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="url-actions">
          {/* Apply styles to the buttons */}
          <button
            className="copy-button"
            onClick={() =>
              copyUrlToClipboard(
                `${window.location.origin}/url/${url.shortUrl}`
              )
            }
          >
            Copy <i className="fas fa-copy"></i>
          </button>
          <button
            className="share-button"
            onClick={() =>
              shareUrl(`${window.location.origin}/url/${url.shortUrl}`)
            }
          >
            Share
          </button>
          <button className="delete-button" onClick={() => deleteUrl(url._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrlCard;
