import { removeBackground } from './remove-background';
import { uploadBufferToS3 } from './upload-buffer-to-s3';

async function convertImage(
  base64: string,
  key: string,
  remove: boolean
): Promise<string> {
  if (base64 === '') {
    return '';
  }
  try {
    let imageBuffer = Buffer.from(base64, 'base64'); // Convert base64 to buffer

    if (remove) {
      imageBuffer = await removeBackground(imageBuffer); // Remove background from the image buffer and replace the original buffer
    }

    const upload = await uploadBufferToS3(imageBuffer, key); // Upload the processed/original image buffer to S3
    if (upload.$metadata.httpStatusCode !== 200) {
      throw new Error('Upload failed');
    }

    return key;
  } catch (error) {
    console.error('Error converting base64:', error);
    throw error;
  }
}

export { convertImage };
