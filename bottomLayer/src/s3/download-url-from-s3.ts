// import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
//
// // Function to retrieve the URL of an S3 object
// async function downloadURLFromS3(objectKey: string) {
//   if (
//     !process.env.AWS_BUCKET_NAME ||
//     !process.env.AWS_ACCESS_KEY ||
//     !process.env.AWS_SECRET_KEY ||
//     !process.env.AWS_BUCKET_REGION
//   ) {
//     throw new Error('One or more AWS environment variables are not defined.');
//   }
//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: objectKey
//   };
//   try {
//     const s3Client = new S3Client({
//       region: process.env.AWS_BUCKET_REGION,
//       credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY,
//         secretAccessKey: process.env.AWS_SECRET_KEY
//       }
//     });
//
//     const signedUrl = await getSignedUrl(
//       s3Client,
//       new GetObjectCommand(params),
//       {
//         expiresIn: 300
//       }
//     );
//
//     if (!signedUrl) {
//       throw new Error('could not get url');
//     }
//
//     // Split the signed URL into its components
//     const urlParts = new URL(signedUrl);
//
//     // Compose a shorter version of the URL with minimal query parameters
//     const shorterUrl = `${urlParts.origin}${urlParts.pathname}`;
//
//     // Return the shorter URL if it fits within 255 characters
//     if (shorterUrl.length <= 255) {
//       return shorterUrl;
//     }
//
//     console.log('Download sucessful:', shorterUrl);
//     s3Client.destroy();
//     return shorterUrl;
//   } catch (error) {
//     console.error('Error generating signed URL:', error);
//   }
// }
//
// export { downloadURLFromS3 };
//
//
//
//
export {};
