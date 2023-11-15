// UrlCard.js
// import { useState } from "react";
import "../../styles/Home/UrlCard.css"; // Import the CSS file
// import axios from "axios";
import { Link } from "react-router-dom";

// eslint-disable-next-line
const UrlCard = ({ url, deleteUrl, shareUrl, copyUrlToClipboard }) => {
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

  const formatCreatedAtTime = (createdAt) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      // month: "short",
      // day: "numeric",
      // year: "numeric",
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
            {/* {
              <iframe
                src={url.originalUrl}
                title="W3Schools Free Online Web Tutorials"
              ></iframe>
            } */}
            {/* eslint-disable */}
            <Link to={url.originalUrl}>
              {url.image ? (
                <img
                  src={url.image}
                  width={300}
                  // height={150}
                  alt="No Image"
                  // onError="no-image.png"
                ></img>
              ) : (
                <></>
              )}
            </Link>
          </div>
          <div className="url-desc">
            <div className="originalUrl">
              {/* <strong>Original URL:</strong>  */}
              <Link to={url.originalUrl}>{url.originalUrl}</Link>
            </div>
            <div className="site_name-div">
              <div>
                <h2 className="site_name">
                  {url.site_name ? url.site_name : url.title ? url.title : ""}
                </h2>
              </div>
              <div>
                {/* eslint-disable */}
                <h2 className="click_count">{url.clicks}</h2>
              </div>
            </div>
            <div>
              <h4 className="title">
                {url.site_name ? (url.title ? url.title : "") : url.description}
              </h4>
            </div>

            <div className="id-date-div">
              <div style={{ paddingRight: "20px" }}>
                {/* <strong>Short URL ID :</strong>  */}
                {url.shortUrl ? (
                  <strong>{`${url.shortUrl}`}</strong>
                ) : (
                  <>{formatCreatedAtTime(url.createdAt)}</>
                )}
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
            onClick={() => {
              url.shortUrl
                ? copyUrlToClipboard(
                    `${window.location.origin}/url/${url.shortUrl}`
                  )
                : copyUrlToClipboard(url.originalUrl);
            }}
          >
            Copy <i className="fas fa-copy"></i>
          </button>
          <button
            className="share-button"
            onClick={() => {
              url.shortUrl
                ? shareUrl(`${window.location.origin}/url/${url.shortUrl}`)
                : shareUrl(url.originalUrl);
            }}
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
