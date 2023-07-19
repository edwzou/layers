const express = require('express');
const neon = require('@cityofzion/neon-js');
const path = require("path");
const fs = require('fs');

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

app.put('/save-cropped-image', (req, res) => {
    const { image } = req.body;
    const imageData = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(imageData, 'base64');
    const filePath = path.join(__dirname, 'cropping', 'photos', 'cropped-image.png');
    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error('Failed to save the cropped image:', err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

// Serve static files from the 'cropping' directory
app.use('/js', express.static(path.join(__dirname, 'cropping')));

const port = 1234; // You can change this to the desired port number
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});