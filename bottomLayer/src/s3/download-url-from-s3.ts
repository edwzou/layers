import { getBucketName, s3 } from '../utils/awsImport';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Function to retrieve the URL of an S3 object
async function downloadURLFromS3(objectKey: string): Promise<string> {
  if (objectKey === '') {
    console.log('Object key is empty. Returning an empty string.');
    return '';
  }

  const params = {
    Bucket: getBucketName(),
    Key: objectKey,
  };

  try {
    // Set a shorter initial expiration time for the presigned URL (e.g., 60 seconds)
    const expiresIn = 10;
    const startTime = Math.floor(Date.now() / 1000);
    const expirationTime = startTime + expiresIn;

    const signedUrl = await getSignedUrl(s3, new GetObjectCommand(params), { expiresIn });
    console.log('Download successful:', signedUrl);

    console.log(`Download URL will expire in ${expiresIn} seconds.`);
    console.log("startTime", startTime);
    console.log("expirationTime", expirationTime);

    // Countdown the remaining time every second until it expires
    for (let remainingTime = expiresIn; remainingTime >= 0; remainingTime--) {
      console.log(`Time remaining: ${remainingTime} seconds.`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('Expiration time has been met.');

    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
};

export { downloadURLFromS3 };
