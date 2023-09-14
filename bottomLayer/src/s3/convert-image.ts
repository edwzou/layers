import { removeBackground } from './remove-background';
import { uploadBufferToS3 } from './upload-buffer-to-s3';
import { downloadURLFromS3 } from './download-url-from-s3';

async function convertImage(base64: string, key: string, remove: boolean) {
  try {
    let imageBuffer = Buffer.from(base64, 'base64'); // Convert base64 to buffer

    if (remove) {
      imageBuffer = await removeBackground(imageBuffer); // Remove background from the image buffer and replace the original buffer
    }

    await uploadBufferToS3(imageBuffer, key); // Upload the processed/original image buffer to S3
    const URL = await downloadURLFromS3(key); // Download URL from S3
    console.log('Convert success:', URL);
    return URL;
  } catch (error) {
    console.error('Error converting base64:', error);
    throw error;
  }
}

export { convertImage };
