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
    const signedUrl = await getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: 300 });
    console.log('Download successful: ', signedUrl); // signedUrl is quite long, need to tweak that
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
};

export { downloadURLFromS3 };
