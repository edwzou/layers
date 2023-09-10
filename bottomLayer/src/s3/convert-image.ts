import axios from 'axios';
import { removeBackground } from './remove-background';
import { uploadURIToS3 } from './upload-uri-to-s3';
import { downloadURLFromS3 } from './download-url-from-s3';

export async function convertImage(URI: string, key: string, remove: boolean) {
  try {
    const response = await axios.get(URI, { responseType: 'arraybuffer' });
    let imageBuffer;
    if (remove) {
      imageBuffer = await removeBackground(response.data); // remove background from the image
    } else {
      imageBuffer = response.data; // don't remove the background
    }
    await uploadURIToS3(imageBuffer, key);
    const URL = await downloadURLFromS3(key);
    console.log('Convert success:', URL);
    return URL;
    // return URI;
  } catch (error) {
    console.error('Error converting URI:', error);
    throw error;
  }
}
