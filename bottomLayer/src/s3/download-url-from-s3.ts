import { getBucketName, getRegion } from '../utils/awsImport';

// Function to retrieve the URL of an S3 object
function downloadURLFromS3(objectKey: string) {
  const bucketName = getBucketName();
  const region = getRegion();
  return `https://${bucketName}.s3.${region}.amazonaws.com/${objectKey}`;
}

export { downloadURLFromS3 };
