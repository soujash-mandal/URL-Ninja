import React, { useState } from "react";
import "../../styles/Drive/DriveFolder.css";

const DriveFolderCard = ({ folder, deleteFolder }) => {
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const handleDeleteClick = () => {
    setDeleteConfirmationVisible(true);
  };

  const handleConfirmDelete = async () => {
    await deleteFolder(folder._id);
    setDeleteConfirmationVisible(false);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationVisible(false);
  };

  let allowedLength = 15;
  const truncatedName =
    folder.name.length > allowedLength
      ? folder.name.substring(0, allowedLength) + "..."
      : folder.name;

  return (
    <div className="drive-card-container">
      <div className="drive-card" title={folder.name}>
        <a href={"/drive/" + folder._id}>📂 {truncatedName}</a>
      </div>
      {/* <button className="btn-folder-edit" title="edit">
        <span className="material-symbols-outlined ">edit</span>
      </button> */}
      <button
        className="btn-folder-delete"
        title="delete"
        onClick={handleDeleteClick}
      >
        <span className="material-symbols-outlined ">delete</span>
      </button>

      {/* Delete Confirmation Prompt */}
      {isDeleteConfirmationVisible && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this folder?</p>
          <button onClick={handleConfirmDelete}>Yes</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default DriveFolderCard;
