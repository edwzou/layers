import { layersBucket1 } from "../utils/gcsImport";

async function uploadURIToGCS(imageContent: Buffer, fileName: string) {
    try {
        const file = layersBucket1.file(fileName);
        const result = await file.save(imageContent);
        console.log('Upload successful:', result);
    } catch (error) {
        console.error('Error uploading to GCS:', error);
        throw error;
    }
}

export { uploadURIToGCS };
