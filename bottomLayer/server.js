const express = require('express');
const path = require("path");
const axios = require('axios');
const https = require('https');
const fs = require('fs');

require('dotenv').config();

const key = fs.readFileSync(process.env.KEY_PATH);
const cert = fs.readFileSync(process.env.CERT_PATH);

const { auth } = require('express-oauth2-jwt-bearer');

const app = express();
app.use(express.json());
const privateRouter = require('./Endpoints/private-endpoints');
const router = require('./Endpoints/endpoints')

const jwtCheck = auth({
  audience: 'http://localhost:1234/',
  issuerBaseURL: 'https://dev-75l58m4fij61lnkg.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

const server = https.createServer({key:key, cert:cert}, app)

app.get('/', (req, res) => { res.send('this is an secure server') });

app.use('/api', router);

// Create a new router for the endpoints that require jwtCheck
const secureRouter = express.Router();

// Apply the JWT authentication middleware (jwtCheck) to the secureRouter
secureRouter.use(jwtCheck);

// Use the original router for your endpoints
secureRouter.use(privateRouter);

// Mount the secureRouter on a specific path, e.g., '/api'
app.use('/api/private', secureRouter);

// Define a route handler for the root URL ("/")
// app.get('/', (req, res) => {
//     const html = `
//     <html>
//       <head>
//         <title>Cropping and Database</title>
//       </head>
//       <body>
//         <button id="cropButton">Click Me</button>
//         <script src="/js/background-cropping.js"></script>
//         <script>
//           document.getElementById('cropButton').addEventListener('click', () => {
//             backgroundCropping();
//           });
//         </script>
//         <p></p>
//         <form id="imageForm" enctype="multipart/form-data">
//           <input type="file" id="imageInput" name="image" accept="image/*">
//           <button type="submit" id="submitButton">Upload Image</button>
//           <script src="/db/database.js"></script>
//           <script>
//             document.getElementById('imageForm').addEventListener('submit', async (error) => {
//                 error.preventDefault();
                
//                 // Get the form data
//                 const formData = new FormData(error.target);
//                 const uploadedImage = formData.get('image');
                
//                 // Create an object to hold the image URL and image data
//                 const imageInfo = {
//                     imageURL: null,
//                     imageData: null
//                 };
                
//                 // Check if an image was uploaded
//                 if (uploadedImage) {
//                     // Convert the uploaded image to a data URL
//                     const imageURL = URL.createObjectURL(uploadedImage);
//                     imageInfo.imageURL = imageURL;
                    
//                     // Convert the uploaded image to a data buffer
//                     const imageBuffer = await uploadedImage.arrayBuffer();
//                     imageInfo.imageData = imageBuffer;
                    
//                     // Send the imageURL and imageData to database.js to handle it there
//                     database(imageInfo.imageURL, imageInfo.imageData);
                    
//                     // Clean up the URL object after use
//                     URL.revokeObjectURL(imageURL);
//                 } else {
//                     console.log('No image selected');
//                 }
//             });
//           </script>
//         </form>
//       </body>
//     </html>
//   `;
//     res.send(html);
// });

// Define a route handler to fetch and serve the image
app.get('/get-image', async (req, res) => {
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
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});