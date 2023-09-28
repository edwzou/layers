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
exports.clothingRoute = exports.default = void 0;
const express_1 = __importDefault(require("express"));
const sqlImport_1 = require("../../utils/sqlImport");
const responseCallback_1 = require("../../utils/responseCallback");
const download_url_from_s3_1 = require("../../s3/download-url-from-s3");
const router = express_1.default.Router();
exports.default = router;
exports.clothingRoute = router;
// Endpoint for retrieving a specific clothing item
router.get('/:itemId', (req, res) => {
    const { itemId } = req.params;
    const getClothingById = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const item = yield sqlImport_1.pool.query('SELECT * FROM backend_schema.clothing_item WHERE ciid = $1', [itemId]);
            const result = item.rows[0];
            const imgRef = result.image_url;
            result.image_url = (0, download_url_from_s3_1.downloadURLFromS3)(imgRef);
            (0, responseCallback_1.responseCallbackGet)(null, result, res, 'Clothing Item');
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackGet)(error, null, res);
        }
    });
    void getClothingById(itemId);
});
// Endpoint for retrieving a all clothing items
router.get('/u/:userId', (req, res) => {
    const { userId } = req.params;
    const client = sqlImport_1.pool.connect();
    const getAllClothing = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const run = sqlImport_1.pool.query('SELECT * FROM backend_schema.clothing_item WHERE uid = $1', [userId]);
            yield (0, responseCallback_1.getUserCore)(userId, yield client);
            const result = yield run;
            const items = result.rows;
            (0, responseCallback_1.responseCallbackGetAll)(items, res, 'Clothing Items');
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackGet)(error, null, res);
        }
        finally {
            (yield client).release();
        }
    });
    void getAllClothing(userId);
});
