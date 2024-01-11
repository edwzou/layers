import { getBucketName, s3 } from '../utils/awsImport';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

async function downloadURLFromS3(objectKey: string): Promise<string> {
	if (objectKey === '') {
		return '';
	}

	const params = {
		Bucket: getBucketName(),
		Key: objectKey,
	};

	try {
		const signedUrl = await getSignedUrl(s3, new GetObjectCommand(params), {
			expiresIn: 10800,
		}); // TTL for presigned URL: 3 hours
		return signedUrl;
	} catch (error) {
		console.error('Error generating signed URL:', error);
		throw error;
	}
}

export { downloadURLFromS3 };
