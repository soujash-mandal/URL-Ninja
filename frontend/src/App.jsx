import { useUser } from "@clerk/clerk-react";
import "./styles/App.css";
import { ClipLoader } from "react-spinners";
import {} from "@clerk/clerk-react";
// import { useEffect, useState } from "react";
// import axios from "axios";
import Home from "./pages/Home";

function App() {
  const { isLoaded, isSignedIn } = useUser();

  while (!isLoaded) {
    return (
      <div className="loading-container">
        <ClipLoader size={50} color="#123abc" loading={true} />
      </div>
    );
  }
  if (!isSignedIn) {
    // return <div>Not signed in</div>;
    return <Home/>
  } else {
    return <Home />;
  }
}

export default App;
