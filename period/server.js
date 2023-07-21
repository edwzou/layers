const express = require('express');
const neon = require('@cityofzion/neon-js');
const path = require("path");
const axios = require('axios');

const app = express();
app.use(express.json());
const router = require('./endpoints');

app.use('/', router);

// Define a route handler for the root URL ("/")
app.get('/', (req, res) => {
    const html = `
    <html>
      <head>
        <title>Button Example</title>
      </head>
      <body>
        <button id="cropButton">Click Me</button>
        <script src="/js/background-cropping.js"></script>
        <script>
          document.getElementById('cropButton').addEventListener('click', () => {
            backgroundCropping();
          });
        </script>
      </body>
    </html>
  `;
    res.send(html);
});

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

const port = 1234; // You can change this to the desired port number
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});