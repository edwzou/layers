"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadBufferToS3 = void 0;
const awsImport_1 = require("../utils/awsImport");
const client_s3_1 = require("@aws-sdk/client-s3");
function uploadBufferToS3(imageContent, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const params = {
                Bucket: (0, awsImport_1.getBucketName)(),
                Key: fileName,
                Body: imageContent,
                ContentType: 'image/jpeg'
            };
            const command = new client_s3_1.PutObjectCommand(params);
            const result = yield awsImport_1.s3.send(command);
            console.log('Upload successful:', result);
            return result;
        }
        catch (error) {
            console.error('Error uploading to S3:', error);
            throw error;
        }
    });
}
exports.uploadBufferToS3 = uploadBufferToS3;
