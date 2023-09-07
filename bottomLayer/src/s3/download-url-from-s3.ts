// import { getBucketName, s3 } from '../utils/awsImport';
// import { GetObjectCommand } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// // Function to retrieve the URL of an S3 object
// async function downloadURLFromS3(objectKey: string): Promise<string> {
//     const params = {
//       Bucket: getBucketName(),
//       Key: objectKey,
//     };
    
//     try {
//       const signedUrl = await getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: 300 });
//       const urlParts = new URL(signedUrl); // Split the signed URL into its components
//       const shorterUrl = `${urlParts.origin}${urlParts.pathname}`; // Compose a shorter version of the URL with minimal query parameters
//       console.log('Download sucessful:', shorterUrl);
//       return shorterUrl
//     } catch (error) {
//       console.error('Error generating signed URL:', error);
//       throw error;
//     }
//   };
  
//   export { downloadURLFromS3 };
