// DriveUrlList.js
import "../../styles/Home/DriveUrlList.css"; // Import the CSS file
import UrlCard from "./UrlCard";

// eslint-disable-next-line
const DriveUrlList = ({ urls, deleteUrl, shareUrl, copyUrlToClipboard }) => {
  const blankDivs = Array.from({ length: 10 }, (_, index) => (
    <div
      key={index} // Don't forget to set a unique key when rendering elements in a loop
      className="url-card"
      style={{ boxShadow: "none", border: "none" }}
    ></div>
  ));
  return (
    <div className="container">
      <div className="url-cards">
        {/* eslint-disable-next-line */}
        {urls.map((url) => (
          <UrlCard
            key={url._id}
            url={url}
            deleteUrl={deleteUrl}
            shareUrl={shareUrl}
            copyUrlToClipboard={copyUrlToClipboard}
          />
        ))}
        {blankDivs}
      </div>
    </div>
  );
};

export default DriveUrlList;
