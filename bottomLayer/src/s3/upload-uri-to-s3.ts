import { getBucketName, s3 } from '../utils/awsImport';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';

async function uploadURIToS3(imageContent: Buffer, fileName: string) {
  const params: PutObjectCommandInput = {
    Bucket: getBucketName(),
    Key: fileName,
    Body: imageContent,
    ContentType: 'image/jpeg'
  };
  try {
    const command = new PutObjectCommand(params);
    const result = await s3.send(command);
    console.log('Upload successful:', result);

    if (!result) {
      s3.destroy();
      throw new Error('Could not upload to S3');
    }

    s3.destroy();
    return result;
  } catch (error) {
    console.error('Error uploading to S3:', error);
  }
}

export { uploadURIToS3 };
