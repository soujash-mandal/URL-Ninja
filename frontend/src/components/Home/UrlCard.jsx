// UrlCard.js

import React from "react";
import "../../styles/Home/UrlCard.css"; // Import the CSS file

// eslint-disable-next-line
const UrlCard = ({ url, deleteUrl, shareUrl, copyUrlToClipboard }) => {
  const formatCreatedAt = (createdAt) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
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

  return (
    <div className="url-card">
      <div className="url-details">
        <div className="url-info">
          <div>
            {
              <iframe
                src={url.originalUrl}
                title="W3Schools Free Online Web Tutorials"
              ></iframe>
            }
          </div>
          <div className="url-desc">
            <div>
              <strong>Original URL:</strong> {url.originalUrl}
            </div>
            <div>
              <strong>Short URL ID :</strong> {`${url.shortUrl}`}
            </div>
            <div>
              <strong>Clicks:</strong> {url.clicks}
            </div>
            <div>
              <strong>Created At:</strong> {formatCreatedAt(url.createdAt)}
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
