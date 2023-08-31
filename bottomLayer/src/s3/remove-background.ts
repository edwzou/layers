import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

async function removeBackground(imageData: Buffer): Promise<Buffer> {
  try {
    const formData = new FormData();
    formData.append('image_file', imageData, {
      filename: 'image.jpg', // Set the desired filename
      contentType: 'image/jpeg' // Set the content type of the image
    });

    const config = {
      method: 'post',
      url: 'https://api.removal.ai/3.0/remove',
      headers: {
        'Rm-Token': '64f0fd47e87a49.31528976',
        ...formData.getHeaders(),
      },
      data: formData
    };

    const response = await axios(config);

    if (response.status === 200) {
      const imageURL = response.data.url; // Get the image URL from the response
      const downloadedImageResponse = await axios.get(imageURL, { responseType: 'arraybuffer' }); // Download the image from the URL as a Buffer
      const downloadedImageBuffer = Buffer.from(downloadedImageResponse.data);
      return downloadedImageBuffer;
    } else {
      throw new Error('Error removing background - invalid API response');
    }
  } catch (error) {
    console.log('Error removing background:', error);
    throw error;
  }
}

export { removeBackground };
