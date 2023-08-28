import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client
} from '@aws-sdk/client-s3';

async function uploadURIToS3(imageContent: Buffer, fileName: string) {
  if (
    !process.env.AWS_BUCKET_NAME ||
    !process.env.AWS_ACCESS_KEY ||
    !process.env.AWS_SECRET_KEY ||
    !process.env.AWS_BUCKET_REGION
  ) {
    throw new Error('One or more AWS environment variables are not defined.');
  }

  const params: PutObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: imageContent,
    ContentType: 'image/jpeg'
  };

  try {
    // Create an S3 client instance
    const s3Client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
      }
    });

    const command = new PutObjectCommand(params);
    const result = await s3Client.send(command);
    console.log('Upload successful:', result);

    if (!result) {
      s3Client.destroy();
      throw new Error('Could not upload to S3');
    }

    s3Client.destroy();
    return result;
  } catch (error) {
    console.error('Error uploading to S3:', error);
  }
}

export { uploadURIToS3 };
