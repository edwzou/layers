const express = require('express');
const neon = require('@cityofzion/neon-js');

const app = express();
const router = express.Router();

// app.js
// const postgres = require('postgres');
// require('dotenv').config();

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
// const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

// const sql = postgres(URL, { ssl: 'require' });

// async function getPgVersion() {
//   const result = await sql`select version()`;
//   console.log(result);
// }

// getPgVersion();


// app.use('/', router);

const port = 1234; // You can change this to the desired port number
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});