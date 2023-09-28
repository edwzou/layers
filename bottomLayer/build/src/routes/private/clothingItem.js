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
exports.privateClothingRoute = exports.default = void 0;
const express_1 = __importDefault(require("express"));
const sqlImport_1 = require("../../utils/sqlImport");
const responseCallback_1 = require("../../utils/responseCallback");
const auth_1 = require("../../middleware/auth");
const convert_image_1 = require("../../s3/convert-image");
const router = express_1.default.Router();
exports.default = router;
exports.privateClothingRoute = router;
// Endpoint for creating a specific clothing item
router.post('/', auth_1.checkAuthenticated, (req, res) => {
    const { image, category, title, brands, size, color } = req.body;
    const uid = req.user;
    const insertClothingItem = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const URL = yield (0, convert_image_1.convertImage)(image, title, true);
            yield sqlImport_1.pool.query(`INSERT INTO backend_schema.clothing_item (image_url, category, title, brands, size, color, uid)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`, [URL, category, title, brands, size, color, uid]);
            (0, responseCallback_1.responseCallbackPost)(null, res, 'Clothing Item');
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackPost)(error, res);
        }
    });
    void insertClothingItem();
});
// Endpoint for deleting a specific outfit
router.delete('/:ciid', auth_1.checkAuthenticated, (req, res) => {
    const { ciid } = req.params;
    const deleteItem = (ciid) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteItem = yield sqlImport_1.pool.query('DELETE FROM backend_schema.clothing_item WHERE ciid = $1', [ciid]);
            (0, responseCallback_1.responseCallbackDelete)(null, ciid, res, 'Clothing Item', deleteItem.rowCount);
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackDelete)(error, ciid, res, 'Clothing Item');
        }
    });
    void deleteItem(ciid);
});
// Endpoint for updating a specific outfit
router.put('/:ciid', auth_1.checkAuthenticated, (req, res) => {
    // Extract outfit data from the request body
    const { ciid } = req.params;
    const { image, category, title, brands, size, color } = req.body;
    const updateItem = (ciid) => __awaiter(void 0, void 0, void 0, function* () {
        // Update the outfit in the database
        try {
            const URL = yield (0, convert_image_1.convertImage)(image, title, true);
            const updateItem = yield sqlImport_1.pool.query(`
      UPDATE backend_schema.clothing_item
      SET image_url = $1,
          category = $2,
          title = $3,
          brands = $4,
          size = $5,
          color = $6
      WHERE ciid = $7
      `, [URL, category, title, brands, size, color, ciid]);
            // responds with successful update even when no changes are made
            (0, responseCallback_1.responseCallbackUpdate)(null, ciid, res, 'Clothing Item', updateItem.rowCount);
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackUpdate)(error, ciid, res, 'Clothing Item');
        }
    });
    void updateItem(ciid);
});
