import { useEffect } from "react";
import axios from "axios"; // Import Axios
import { useSession } from "@clerk/clerk-react";
import CreateUrl from "../components/CreateUrl";
import config from '../../config.json';
// import env from "react-dotenv";

const Home = () => {
  const { session } = useSession();
  console.log("hello"+config.API_KEY);

  // Define the function to fetch all URLs
  const fetchAllUrls = async () => {
    const token = await session.getToken();
    try {
      const response = await axios.get(config.API_BASE_URL + "/api/v1/all-urls", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = response.data;
      console.log(data);
      // Handle the data here
    } catch (error) {
      // Handle any errors here
    }
  };

  useEffect(() => {
    fetchAllUrls(); // Call the function to fetch data when the component mounts
  }, []);

  return (<>
    <CreateUrl></CreateUrl>
    
  </>);
};

export default Home;
