import axios from "axios";

export const getPreviewMetadata = async (url) => {
  try {
    const preview = await axios.get(
      "https://url-metadata.onrender.com/?url=" + url
    );
    const data = preview.data;

    // Create an object with the necessary data
    const previewData = {
      image: data.image,
      title: data.title,
      site_name: data.site_name,
      description: data.description,
    };

    // Return the data for further use
    return previewData;
  } catch (error) {
    console.error("Failed to get preview link:", error);
    // You might want to handle the error here, or just return an empty object
    return {};
  }
};
