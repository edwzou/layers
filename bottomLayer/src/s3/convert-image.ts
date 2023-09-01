import axios from "axios";
import { downloadURLFromS3 } from "./download-url-from-s3";
import { uploadURIToS3 } from "./upload-uri-to-s3";
import { removeBackground } from "./remove-background";

async function convertImage(URI: string, key: string, remove: boolean) {
  try {
    const response = await axios.get(URI, { responseType: 'arraybuffer' });
    let imageBuffer;
    if (remove) {
      imageBuffer = await removeBackground(response.data); // remove background from the image
    } else {
      imageBuffer = response.data; // don't remove the background
    }
    await uploadURIToS3(imageBuffer, key); // uploading URI to S3
    const URL = await downloadURLFromS3(key); // downloading URL from S3
    console.log('Convert success:', URL);
    return URL;
  } catch (error) {
    console.error("Error converting URI:", error);
    throw error;
  }
};

export { convertImage };