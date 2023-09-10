import { getBucketName, s3 } from '../utils/awsImport';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';

async function uploadURIToS3(imageContent: Buffer, fileName: string) {
  try {
    const params: PutObjectCommandInput = {
      Bucket: getBucketName(),
      Key: fileName,
      Body: imageContent,
      ContentType: 'image/jpeg'
    };

    const command = new PutObjectCommand(params);
    const result = await s3.send(command);
    console.log('Upload successful:', result);
    return result;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
}

export { uploadURIToS3 };
