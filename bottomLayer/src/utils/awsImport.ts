import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Check if AWS credentials are provided in the environment
if (
  !process.env.SPACES_BUCKET_NAME ||
  !process.env.SPACES_ACCESS_KEY ||
  !process.env.SPACES_SECRET_KEY ||
  !process.env.SPACES_ENDPOINT ||
  !process.env.SPACES_BUCKET_REGION
) {
  throw new Error('One or more AWS environment variables are not defined.');
}

// Create an S3 client instance
const s3Client = new S3Client({
  forcePathStyle: false,
  endpoint: process.env.SPACES_ENDPOINT,
  // This region doesnt matter/has no impact on code
  region: process.env.SPACES_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY,
    secretAccessKey: process.env.SPACES_SECRET_KEY
  }
});

// Function to get the bucket name
function getBucketName(): string {
  return process.env.SPACES_BUCKET_NAME ?? '';
}

// Export the S3 client instance and the getBucketName function
export { s3Client as s3, getBucketName };
