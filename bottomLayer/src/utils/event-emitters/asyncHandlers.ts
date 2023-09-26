import { downloadURLFromS3 } from '../../s3/download-url-from-s3';
import { type AsyncManager } from './asyncManager';

// Note doesn't log the imageRef
export const urlDownloadHandler = async (
  imgRef: string,
  userRef: string,
  asyncEmitter: AsyncManager,
  failure: string = 'Failure Downloading URL from S3: '
): Promise<void> => {
  try {
    const result = await downloadURLFromS3(imgRef);
    imgRef = result;

    asyncEmitter.complete(userRef);
  } catch (error: unknown) {
    if (error instanceof Error) {
      asyncEmitter.failure(
        failure + error.message + '\n with image: ' + imgRef,
        userRef
      );
    }
  }
};
