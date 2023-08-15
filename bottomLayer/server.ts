import { routerBase, routerPublic, routerPrivate } from './src/routes/endpoints';
import { responseCallbackGet } from './src/utils/responseCallback';
import { sql } from './src/utils/sqlImport';
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const jwt = require('jsonwebtoken');
// const { auth } = require('./src/middleware/auth.ts');
require('dotenv').config();

app.use(express.json());
app.use(passport.initialize());

// passport.use(new LocalStrategy((username, password, done) => {
//   // const getUser = async (userId: string): Promise<void> => {
//   //   try {
//   //     const user = await sql`
//   //       SELECT * FROM backend_schema.user
//   //       WHERE uid = ${userId}
//   //   `;

//   //     responseCallbackGet(null, user, res, 'User');
//   //   } catch (error) {
//   //     responseCallbackGet(error, null, res);
//   //   }
//   // };

// }));

app.get('/', (req: any, res: any) => { res.send('this is an secure server'); });
app.use('/', routerBase);
app.use('/api', routerPublic);
// app.use('/api/private', auth);
app.use('/api/private', routerPrivate);

// Define a route handler for the root URL ("/")
app.get('/', (req: any, res: any) => {
  const html = `
    <html>
      <head>
        <title>Cropping and Database</title>
      </head>
      <body>
        <button id="cropButton">Click Me</button>
        <script src="/js/background-cropping.js"></script>
        <script>
          document.getElementById('cropButton').addEventListener('click', () => {
            backgroundCropping();
          });
        </script>
        <p></p>
        <form id="imageForm" enctype="multipart/form-data">
          <input type="file" id="imageInput" name="image" accept="image/*">
          <button type="submit" id="submitButton">Upload Image</button>
          <script src="/db/database.js"></script>
          <script>
            document.getElementById('imageForm').addEventListener('submit', async (error) => {
                error.preventDefault();
                
                // Get the form data
                const formData = new FormData(error.target);
                const uploadedImage = formData.get('image');
                
                // Create an object to hold the image URL and image data
                const imageInfo = {
                    imageURL: null,
                    imageData: null
                };
                
                // Check if an image was uploaded
                if (uploadedImage) {
                    // Convert the uploaded image to a data URL
                    const imageURL = URL.createObjectURL(uploadedImage);
                    imageInfo.imageURL = imageURL;
                    
                    // Convert the uploaded image to a data buffer
                    const imageBuffer = await uploadedImage.arrayBuffer();
                    imageInfo.imageData = imageBuffer;
                    
                    // Send the imageURL and imageData to database.js to handle it there
                    database(imageInfo.imageURL, imageInfo.imageData);
                    
                    // Clean up the URL object after use
                    URL.revokeObjectURL(imageURL);
                } else {
                    console.log('No image selected');
                }
            });
          </script>
        </form>
      </body>
    </html>
  `;
  res.send(html);
});

// Define a route handler to fetch and serve the image
app.get('/get-image', async (req: any, res: any) => {
  try {
    const imageURL = 'https://www.saab-heritage.fr/saabHeritage_images/produits/img-8053.jpg';
    const response = await axios.get(imageURL, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).send('Failed to fetch and serve the image.');
  }
});

// Serve static files from the 'cropping' directory
app.use('/js', express.static(path.join(__dirname, 'cropping')));

// Serve static files form the 'database' directory
app.use('/db', express.static(path.join(__dirname, 'database')));

const port = 1234; // You can change this to the desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
