import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

if (accessKeyId == null || secretAccessKey == null) {
  throw new Error('credentials not found');
}

const client = new S3Client({
  region: 'us-west-2',
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

export const uploadImage = async (uri: string, key: string): Promise<any> => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  if (bucketName == null) throw new Error('bucket not found');

  const imageBuffer = Buffer.from(uri.split(',')[1], 'base64');

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: imageBuffer,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  });

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};
