import '../../styles/Drive/DriveFolder.css';

const DriveFolderCard = ({ folder }) => {
  // Truncate the folder name if it is too long
  const truncatedName = folder.name.length > 20
    ? folder.name.substring(0, 6) + '...'  // Adjust the number (20) based on your preference
    : folder.name;

  return (
    <div className='drive-card' title={folder.name}>
      📂 {truncatedName}
    </div>
  );
};

export default DriveFolderCard;
