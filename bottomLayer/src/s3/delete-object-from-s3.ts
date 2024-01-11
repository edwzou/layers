import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getBucketName, s3 } from '../utils/awsImport';

async function deleteObjectFromS3(objectKey: string) {
	const params = {
		Bucket: getBucketName(),
		Key: objectKey,
	};

	try {
		const result = await s3.send(new DeleteObjectCommand(params));
	} catch (error) {
		console.error(`Error deleting object with key ${objectKey}:`, error);
		throw error;
	}
}

export { deleteObjectFromS3 };
