import { getBucketName, s3 } from '../utils/awsImport';
import {
  PutObjectCommand,
  type PutObjectCommandInput
} from '@aws-sdk/client-s3';

async function uploadBufferToS3(imageContent: Buffer, fileName: string) {
  try {
    const params: PutObjectCommandInput = {
      Bucket: getBucketName(),
      Key: fileName,
      Body: imageContent,
      ContentType: 'image/jpeg'
    };

    const result = await s3.send(new PutObjectCommand(params));
    console.log('Upload successful:', result);
    return result;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
}

export { uploadBufferToS3 };


// import { getBucketName, s3 } from '../utils/awsImport';
// import {
//   HeadObjectCommand,
//   PutObjectCommand,
//   type HeadObjectCommandInput,
//   type PutObjectCommandInput
// } from '@aws-sdk/client-s3';

// async function uploadBufferToS3(imageContent: Buffer, fileName: string) {
//   try {
//     // Check if the object already exists
//     const headParams: HeadObjectCommandInput = {
//       Bucket: getBucketName(),
//       Key: fileName,
//     };

//     try {
//       // If HeadObject succeeds, the object already exists
//       await s3.send(new HeadObjectCommand(headParams));

//       // Object exists, proceed to overwrite it
//       console.log(`Object with key ${fileName} already exists. Overwriting...`);
//     } catch (headError) {
//       // HeadObject failed, indicating that the object doesn't exist
//       if (headError.name === 'NotFound') {
//         console.log(`Object with key ${fileName} does not exist. Uploading...`);
//       } else {
//         // Unexpected error, throw it
//         throw headError;
//       }
//     }

//     // Upload the object
//     const putParams: PutObjectCommandInput = {
//       Bucket: getBucketName(),
//       Key: fileName,
//       Body: imageContent,
//       ContentType: 'image/jpeg'
//     };

//     const result = await s3.send(new PutObjectCommand(putParams));
//     console.log('Upload successful:', result);
//     return result;
//   } catch (error) {
//     console.error('Error uploading to S3:', error);
//     throw error;
//   }
// }

// export { uploadBufferToS3 };

// preparing for potential modification from presigned url stuff
