import { Storage } from '@google-cloud/storage';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const gc = new Storage({
    keyFilename: path.join(__dirname, 'angelic-cat-393620-9872b786fdb4.json'),
    projectId: 'angelic-cat-393620'
});

// console.log('__dirname:', __dirname);
// console.log('Key file path:', path.join(__dirname, 'angelic-cat-393620-9872b786fdb4.json'));
// gc.getBuckets().then(x => console.log(x));

const layersBucket1 = gc.bucket('layers-bucket-1');

export { layersBucket1 };
