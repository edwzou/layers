import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

async function removeBackground(imageData: Buffer): Promise<Buffer> {
  // try {
  //   if (
  //     process.env.RB_ENDPOINT === null ||
  //     process.env.RB_ENDPOINT === undefined ||
  //     process.env.RB_ENDPOINT === '' ||
  //     process.env.RB_API_KEY === null ||
  //     process.env.RB_API_KEY === undefined ||
  //     process.env.RB_API_KEY === ''
  //   ) {
  //     throw new Error(
  //       'One or more remove_background environment variables are not defined.'
  //     );
  //   }

  //   const formData = new FormData();
  //   formData.append('image_file', imageData, {
  //     filename: 'image.jpg', // Set the desired filename
  //     contentType: 'image/jpg' // Set the content type of the image. May need to change this to image/jpg
  //   });

  //   const config = {
  //     method: 'POST',
  //     //url: process.env.RB_ENDPOINT,
  //     url: process.env.CLIPDROP_ENDPOINT,
  //     headers: {
  //       //'Rm-Token': process.env.RB_API_KEY, // 3 more calls
  //       'x-api-key': process.env.CLIPDROP_API_KEY,
  //       //...formData.getHeaders()
  //     },
  //     data: formData
  //   };

  //   const response = await axios(config);
  //   //console.log(response);

  //   if (response.status === 200) {
  //     const imageURL = response.data.url; // Get the image URL from the response
  //     const downloadedImageResponse = await axios.get(imageURL, {
  //       responseType: 'arraybuffer'
  //     }); // Download the image from the URL as a Buffer
  //     const downloadedImageBuffer = Buffer.from(downloadedImageResponse.data);
  //     return downloadedImageBuffer;
  //   } else {
  //     throw new Error('Error removing background - invalid API response');
  //   }
  // } catch (error) {
  //   console.log('Error removing background:', error);
  //   throw error;
  // }

  try {
    if (
      process.env.CLIPDROP_ENDPOINT === null ||
      process.env.CLIPDROP_ENDPOINT === undefined ||
      process.env.CLIPDROP_ENDPOINT === '' ||
      process.env.CLIPDROP_API_KEY === null ||
      process.env.CLIPDROP_API_KEY === undefined ||
      process.env.CLIPDROP_API_KEY === ''
    ) {
      throw new Error(
        'One or more clipdrop environment variables are not defined.'
      );
    }

    const formData = new FormData();
    formData.append('image_file', imageData, {
      filename: 'image.jpg', // Set the desired filename
      contentType: 'image/jpg' // Set the content type of the image.
    });

    const response = await axios.post(process.env.CLIPDROP_ENDPOINT, formData, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API_KEY,
      },
      responseType: 'arraybuffer',
    });
    
    return Buffer.from(response.data);
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
}

export { removeBackground };
