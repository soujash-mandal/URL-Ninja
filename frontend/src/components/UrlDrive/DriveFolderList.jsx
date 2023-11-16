import DriveFolderCard from "./DriveFolderCard";

// eslint-disable-next-line
const FolderList = ({ folders, deleteFolder }) => {
  const blankDivs = Array.from({ length: 7 }, (_, index) => (
    <div
      key={index} // Don't forget to set a unique key when rendering elements in a loop
      className="folder-card"
      style={{ boxShadow: "none", border: "none" }}
    ></div>
  ));
  return (
    <div className="container">
      <div className="folder-cards">
        {folders.map((folder, index) => (
          <DriveFolderCard
            key={index}
            folder={folder}
            deleteFolder={deleteFolder}
          />
        ))}
        {/* {blankDivs} */}
      </div>
    </div>
  );
};

export default FolderList;
