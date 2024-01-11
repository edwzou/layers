import { getBucketName, s3 } from '../utils/awsImport';
import {
	PutObjectCommand,
	type PutObjectCommandInput,
} from '@aws-sdk/client-s3';

async function uploadBufferToS3(imageContent: Buffer, fileName: string) {
	try {
		const params: PutObjectCommandInput = {
			Bucket: getBucketName(),
			Key: fileName,
			Body: imageContent,
			ContentType: 'image/jpeg',
		};

		const result = await s3.send(new PutObjectCommand(params));
		return result;
	} catch (error) {
		console.error('Error uploading to S3:', error);
		throw error;
	}
}

export { uploadBufferToS3 };
