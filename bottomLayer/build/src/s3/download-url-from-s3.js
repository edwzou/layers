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
exports.downloadURLFromS3 = void 0;
const awsImport_1 = require("../utils/awsImport");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
// Function to retrieve the URL of an S3 object
function downloadURLFromS3(objectKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            Bucket: (0, awsImport_1.getBucketName)(),
            Key: objectKey
        };
        try {
            const signedUrl = yield (0, s3_request_presigner_1.getSignedUrl)(awsImport_1.s3, new client_s3_1.GetObjectCommand(params), {
                expiresIn: 600
            });
            const objectUrl = new URL(signedUrl); // Split the signed URL into its components
            return objectUrl.href;
        }
        catch (error) {
            console.error('Error generating signed URL:', error);
            throw error;
        }
    });
}
exports.downloadURLFromS3 = downloadURLFromS3;
