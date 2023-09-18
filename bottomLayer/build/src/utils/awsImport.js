"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBucketName = exports.s3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Check if AWS credentials are provided in the environment
if (process.env.AWS_BUCKET_NAME === null ||
    process.env.AWS_BUCKET_NAME === undefined ||
    process.env.AWS_BUCKET_NAME === '' ||
    process.env.AWS_BUCKET_REGION === null ||
    process.env.AWS_BUCKET_REGION === undefined ||
    process.env.AWS_BUCKET_REGION === '' ||
    process.env.AWS_ACCESS_KEY === null ||
    process.env.AWS_ACCESS_KEY === undefined ||
    process.env.AWS_ACCESS_KEY === '' ||
    process.env.AWS_SECRET_KEY === null ||
    process.env.AWS_SECRET_KEY === undefined ||
    process.env.AWS_SECRET_KEY === '') {
    throw new Error('One or more AWS environment variables are not defined.');
}
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});
exports.s3 = s3Client;
// Function to get the bucket name
function getBucketName() {
    var _a;
    return (_a = process.env.AWS_BUCKET_NAME) !== null && _a !== void 0 ? _a : '';
}
exports.getBucketName = getBucketName;
