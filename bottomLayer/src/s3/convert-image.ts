import axios from "axios";
import { removeBackground } from "./remove-background";
import { uploadURIToGCS } from "../gcs/upload-uri-to-gcs";
import { downloadURLFromGCS } from "../gcs/download-url-from-gcs";

async function convertImage(URI: string, key: string, remove: boolean) {
  try {
    const response = await axios.get(URI, { responseType: 'arraybuffer' });
    let imageBuffer;
    if (remove) {
      imageBuffer = await removeBackground(response.data); // remove background from the image
    } else {
      imageBuffer = response.data; // don't remove the background
    }
    await uploadURIToGCS(imageBuffer, key); // uploading URI to GCS
    const URL = downloadURLFromGCS(key);
    console.log('Convert success:', URL);
    return URL;
  } catch (error) {
    console.error("Error converting URI:", error);
    throw error;
  }
};

export { convertImage };