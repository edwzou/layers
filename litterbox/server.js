const express = require('express');
const neon = require('@cityofzion/neon-js');

const app = express();
app.use(express.json());
const router = require('./endpoints');

app.use('/', router);

// Define a route handler for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = 1234; // You can change this to the desired port number
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});