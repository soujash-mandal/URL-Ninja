import { useSession } from "@clerk/clerk-react";
import axios from "axios";
import { useState } from "react";
import config from "../../config.json";

const CreateUrl = () => {
  const { session } = useSession();
  const [url, seturl] = useState("");

  // on change url it changes the state
  const hadleUrlChange = (e) => {
    seturl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // get token from clerk
    const token = await session.getToken();
    try {
      const response = await axios.post(
        config.API_BASE_URL + "/api/v1/url",
        { originalUrl: url },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = response.data;
      console.log(data);
      // Handle the data here
    } catch (error) {
      // Handle any errors here
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          name="url"
          placeholder="enter your url here"
          onChange={hadleUrlChange}
        />
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default CreateUrl;
