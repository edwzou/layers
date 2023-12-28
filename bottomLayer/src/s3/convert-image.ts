import { removeBackground } from './remove-background';
import { uploadBufferToS3 } from './upload-buffer-to-s3';
import sharp from 'sharp';

async function isValidBase64String(base64: string): Promise<boolean> {
	if (typeof base64 !== 'string') {
		return false;
	}

	const regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/; // REGEX checker
	return regex.test(base64);
}

async function convertToJpegBase64Buffer(base64: string): Promise<Buffer> {
	const buffer = Buffer.from(base64, 'base64'); // Convert the base64 string to a buffer
	return sharp(buffer) // Use sharp to convert the image to JPEG
		.toFormat('jpeg')
		.toBuffer();
}

async function convertImage(
	base64: string,
	key: string,
	remove: boolean
): Promise<string> {
	if (base64 === '' || !(await isValidBase64String(base64))) {
		console.log('fail');
		throw new Error(`Invalid base64 string: ${base64}`);
	}

	try {
		let imageBuffer = await convertToJpegBase64Buffer(base64);

		if (remove) {
			imageBuffer = await removeBackground(imageBuffer);
		}

		const upload = await uploadBufferToS3(imageBuffer, key);
		if (upload.$metadata.httpStatusCode !== 200) {
			throw new Error('Upload failed');
		}

		return key;
	} catch (error) {
		console.error('Error converting base64:', error);
		throw error;
	}
}

export { convertImage };
