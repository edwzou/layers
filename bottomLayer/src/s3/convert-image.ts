import { removeBackground } from './remove-background';
import { uploadURIToS3 } from './upload-uri-to-s3';
import { downloadURLFromS3 } from './download-url-from-s3';

async function convertImage(base64: string, key: string, remove: boolean) {
  try {
    const imageBuffer = Buffer.from(base64, 'base64'); // Convert base64 to buffer

    if (remove) {
      const processedImageBuffer = await removeBackground(imageBuffer); // Remove background from the image
      await uploadURIToS3(processedImageBuffer, key); // Upload processed image to S3
    } else {
      await uploadURIToS3(imageBuffer, key); // Upload original image to S3
    }

    const URL = await downloadURLFromS3(key); // Download URL from S3
    console.log('Convert success:', URL);
    return URL;
  } catch (error) {
    console.error('Error converting base64:', error);
    throw error;
  }
}

export { convertImage };
