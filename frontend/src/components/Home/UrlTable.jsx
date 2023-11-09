// eslint-disable-next-line
const UrlTable = ({ urls, deleteUrl, shareUrl, copyUrlToClipboard }) => {
  const formatCreatedAt = (createdAt) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Date(createdAt).toLocaleString(undefined, options);
  };

  return (
    <div className="container">
      {/* Your comment here */}
      <table className="url-table">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Copy</th>
            <th>Share</th>
            <th>Clicks</th>
            <th>Created At</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* eslint-disable-next-line */}
          {urls.map((url, index) => (
            <tr key={url._id}>
              <td>{index + 1}</td>
              <td>{url.originalUrl}</td>
              <td>{`${window.location.origin}/url/${url.shortUrl}`}</td>
              <td>
                <button
                  onClick={() =>
                    copyUrlToClipboard(
                      `${window.location.origin}/url/${url.shortUrl}`
                    )
                  }
                >
                  Copy
                  <i className="fas fa-copy"></i>
                </button>
              </td>
              <td>
                <button
                  onClick={() =>
                    shareUrl(`${window.location.origin}/url/${url.shortUrl}`)
                  }
                >
                  Share
                </button>
              </td>
              <td>{url.clicks}</td>
              <td>{formatCreatedAt(url.createdAt)}</td>
              <td>
                <button onClick={() => deleteUrl(url._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlTable;
