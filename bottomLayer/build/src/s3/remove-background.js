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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBackground = void 0;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function removeBackground(imageData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.RB_ENDPOINT === null ||
                process.env.RB_ENDPOINT === undefined ||
                process.env.RB_ENDPOINT === '' ||
                process.env.RB_API_KEY === null ||
                process.env.RB_API_KEY === undefined ||
                process.env.RB_API_KEY === '') {
                throw new Error('One or more remove_background environment variables are not defined.');
            }
            const formData = new form_data_1.default();
            formData.append('image_file', imageData, {
                filename: 'image.jpg',
                contentType: 'image/jpeg' // Set the content type of the image
            });
            const config = {
                method: 'post',
                url: process.env.RB_ENDPOINT,
                headers: Object.assign({ 'Rm-Token': process.env.RB_API_KEY }, formData.getHeaders()),
                data: formData
            };
            const response = yield (0, axios_1.default)(config);
            if (response.status === 200) {
                const imageURL = response.data.url; // Get the image URL from the response
                const downloadedImageResponse = yield axios_1.default.get(imageURL, {
                    responseType: 'arraybuffer'
                }); // Download the image from the URL as a Buffer
                const downloadedImageBuffer = Buffer.from(downloadedImageResponse.data);
                return downloadedImageBuffer;
            }
            else {
                throw new Error('Error removing background - invalid API response');
            }
        }
        catch (error) {
            console.log('Error removing background:', error);
            throw error;
        }
    });
}
exports.removeBackground = removeBackground;
