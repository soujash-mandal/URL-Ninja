import { Navigate } from "react-router-dom";

const RedirectToMyDrive = () => {
  return <Navigate to="/drive/my-drive" replace />;
};

export default RedirectToMyDrive;
