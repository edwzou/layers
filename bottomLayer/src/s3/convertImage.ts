import axios from 'axios';
import { downloadURLFromS3 } from './download-url-from-s3';
import { uploadURIToS3 } from './upload-uri-to-s3';

export const convertImage = async (
  URI: string,
  key: string
): Promise<string> => {
  try {
    const response = await axios.get(URI, { responseType: 'arraybuffer' });
    // const imageBuffer = Buffer.from(response.data, 'binary');
    await uploadURIToS3(response.data, key); // uploading URI to S3
    const URL = await downloadURLFromS3(key); // downloading URL from S3
    console.log('Convert success:', URL);
    return URL;
  } catch (error) {
    console.error('Error converting URI:', error);
    throw error;
  }
};
