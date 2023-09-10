"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.layersBucket1 = void 0;
var storage_1 = require("@google-cloud/storage");
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
var gc = new storage_1.Storage({
    keyFilename: path_1.default.join(__dirname, 'angelic-cat-393620-9872b786fdb4.json'),
    projectId: 'angelic-cat-393620'
});
// console.log('__dirname:', __dirname);
// console.log('Key file path:', path.join(__dirname, 'angelic-cat-393620-9872b786fdb4.json'));
// gc.getBuckets().then(x => console.log(x));
var layersBucket1 = gc.bucket('layers-bucket-1');
exports.layersBucket1 = layersBucket1;
