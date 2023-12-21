import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

async function removeBackground(imageData: Buffer): Promise<Buffer> {
  try {
    if (
      process.env.RB_ENDPOINT === null ||
      process.env.RB_ENDPOINT === undefined ||
      process.env.RB_ENDPOINT === '' ||
      process.env.RB_API_KEY === null ||
      process.env.RB_API_KEY === undefined ||
      process.env.RB_API_KEY === ''
    ) {
      throw new Error(
        'One or more remove_background environment variables are not defined.'
      );
    }

    const formData = new FormData();
    formData.append('image_file', imageData, {
      filename: 'image.jpeg', // Set the desired filename
      contentType: 'image/jpeg' // Set the content type of the image
    });

    const config = {
      method: 'post',
      url: process.env.RB_ENDPOINT,
      headers: {
        'Rm-Token': process.env.RB_API_KEY, // 3 more calls
        ...formData.getHeaders()
      },
      data: formData
    };

    const response = await axios(config);

    if (response.status === 200) {
      const imageURL = response.data.url; // Get the image URL from the response
      const downloadedImageResponse = await axios.get(imageURL, {
        responseType: 'arraybuffer'
      }); // Download the image from the URL as a Buffer
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
