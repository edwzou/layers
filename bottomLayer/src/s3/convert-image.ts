import { removeBackground } from './remove-background';
import { uploadBufferToS3 } from './upload-buffer-to-s3';

async function isValidBase64String(base64: string): Promise<boolean> {
  if (typeof base64 !== 'string') {
    return false;
  }

  // Check if the string starts with "data:image/jpeg;base64," or "data:image/png;base64,"
  if (base64.startsWith('/9j/') || base64.startsWith('iVBORw0KGgo=')) {
    return true;
  }

  const regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
  return regex.test(base64);
}

async function convertImage(
  base64: string,
  key: string,
  remove: boolean
): Promise<string> {
  if (base64 === '' || !(await isValidBase64String(base64))) {
    console.error('Invalid base64 string:', base64);
    return '';
  }

  try {
    let imageBuffer = Buffer.from(base64, 'base64');

    if (remove) {
      imageBuffer = await removeBackground(imageBuffer);
    }

    const upload = await uploadBufferToS3(imageBuffer, key);
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
