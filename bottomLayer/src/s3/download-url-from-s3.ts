import { getBucketName, s3 } from '../utils/awsImport';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Function to retrieve the URL of an S3 object with automatic token refresh
async function downloadURLFromS3(objectKey: string | undefined): Promise<string> {
  if (objectKey === undefined) {
    console.log('Object key is undefined. Returning an empty string.');
    return '';
  }

  const bucketName = getBucketName();

  // Set the initial expiration time for the presigned URL
  let expirationTime = 5; // trying 5 seconds

  // Function to generate a presigned URL
  const getPresignedUrl = async (key: string) => {
    const params = {
      Bucket: bucketName,
      Key: key,
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

  // Function to refresh the presigned URL before it expires
  const refreshUrl = async () => {
    const newUrl = await getPresignedUrl(objectKey);
    // Update the expiration time based on the new URL
    const now = Math.floor(Date.now() / 1000);
    expirationTime = Math.max(1, expirationTime - (now - Math.floor(Date.parse(newUrl) / 1000)));
    console.log('Presigned URL refreshed. New expiration time:', expirationTime);
    // Schedule the next refresh slightly before the expiration
    setTimeout(refreshUrl, (expirationTime - 60) * 1000); // Refresh 1 minute before expiration
  };

  // Initial URL generation
  let url = await getPresignedUrl(objectKey);

  // Start the automatic refresh cycle
  refreshUrl(); // may have to move this function elsewhere
  console.log("expiration time: " + expirationTime);

  // two possible approaches, 1: simply set the expiration date to be as long as possible (168 * 60 * 60) i.e. 7 days. Not robust enough but 
  // somewhat a valid approach for an MVP. 2: call refreshUrl() somewhere. The issue is that it may create too many presigned URLs in the
  // bucket. For approach 2 need to also modify the upload-buffer-to-s3 method to remove the existing url to replace with old one

  // Does the URL get automatically overwritten?

  // note: right now working with layers-test-bucket-1 all credential are for that bucket's policy

  return url;
}

export { downloadURLFromS3 };
