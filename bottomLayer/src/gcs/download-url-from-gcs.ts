import { layersBucket1 } from "../utils/gcsImport";

async function downloadURLFromGCS(objectKey: string): Promise<string> {
    try {
        const file = layersBucket1.file(objectKey);
        const [url] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 60 * 60 * 1000, // URL expiration time (e.g., 1 hour)
        });

        console.log('Download successful:', url);
        return url;
    } catch (error) {
        console.error('Error generating GCS download URL:', error);
        throw error;
    }
}

export { downloadURLFromGCS };
