import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Check if AWS credentials are provided in the environment
if (
  !process.env.AWS_BUCKET_NAME ||
  !process.env.AWS_ACCESS_KEY ||
  !process.env.AWS_SECRET_KEY ||
  !process.env.AWS_BUCKET_REGION
) {
  throw new Error('One or more AWS environment variables are not defined.');
}

// Create an S3 client instance
const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

// Function to get the bucket name
function getBucketName(): string {
  return process.env.AWS_BUCKET_NAME ?? '';
}

// Export the S3 client instance and the getBucketName function
export { s3Client as s3, getBucketName };
