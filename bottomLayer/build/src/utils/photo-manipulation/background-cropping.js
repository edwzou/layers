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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
require('dotenv').config();
// API request
function backgroundCropping() {
    return __awaiter(this, void 0, void 0, function () {
        var endpoint, apiKey, imageURL, formData, imageFile, response, blob, imageUrl, img;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Cropped baby!');
                    endpoint = process.env.PHOTOROOM_URL;
                    apiKey = process.env.PHOTOROOM_API_KEY;
                    imageURL = 'http://localhost:1234/get-image';
                    formData = new FormData();
                    return [4 /*yield*/, fetch(imageURL)
                            .then(function (response) { return response.blob(); })
                            .then(function (blob) { return new File([blob], 'SAAB.jpg', { type: 'application/json' }); })];
                case 1:
                    imageFile = _a.sent();
                    // Append the image file to the formData
                    formData.append('image_file', imageFile);
                    return [4 /*yield*/, fetch(endpoint, {
                            method: 'POST',
                            headers: { 'x-api-key': apiKey },
                            body: formData
                        })];
                case 2:
                    response = _a.sent();
                    if (!(response.status === 200)) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.blob()];
                case 3:
                    blob = _a.sent();
                    imageUrl = URL.createObjectURL(blob);
                    img = new Image();
                    img.src = imageUrl;
                    document.body.appendChild(img);
                    console.log('Image uploaded and processed successfully!');
                    return [3 /*break*/, 5];
                case 4:
                    console.log('Image upload failed.');
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
