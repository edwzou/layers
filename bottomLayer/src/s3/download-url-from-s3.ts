// import { getBucketName, getRegion } from '../utils/awsImport';

// // Function to retrieve the URL of an S3 object
// async function downloadURLFromS3(objectKey: string) {
//   const bucketName = getBucketName();
//   const region = getRegion();
//   return `https://${bucketName}.s3.${region}.amazonaws.com/${objectKey}`;
// }

// export { downloadURLFromS3 };

import { getBucketName, s3 } from '../utils/awsImport';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Function to retrieve the URL of an S3 object with token refresh
async function downloadURLFromS3(objectKey: string) {
  const bucketName = getBucketName();

  // Set the expiration time for the presigned URL
  const expirationTime = 60; // 1 minute or 60 seconds

  // Function to generate a presigned URL
  const getPresignedUrl = async () => {
    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };

    try {
      const signedUrl = await getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: expirationTime });
      const urlParts = new URL(signedUrl);
      const shorterUrl = `${urlParts.origin}${urlParts.pathname}`;
      console.log('Download successful:', shorterUrl);
      return shorterUrl;
    } catch (error) {
      console.error('Error generating signed URL:', error);
      throw error;
    }
  };

  // Initial URL generation
  let url = await getPresignedUrl();

  // Function to refresh the presigned URL before it expires
  const refreshUrl = async () => {
    url = await getPresignedUrl();
    // Schedule the next refresh slightly before the expiration
    setTimeout(refreshUrl, (expirationTime - 60) * 1000); // Refresh 1 minute before expiration
  };

  // Start the refresh cycle
  refreshUrl();

  return url;
}

export { downloadURLFromS3 };
