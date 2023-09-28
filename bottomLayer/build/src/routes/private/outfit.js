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
exports.privateOutfitRoute = exports.default = void 0;
const auth_1 = require("../../middleware/auth");
const responseCallback_1 = require("../../utils/responseCallback");
const sqlImport_1 = require("../../utils/sqlImport");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
exports.privateOutfitRoute = router;
// Endpoint for creating a new outfit
router.post('/', auth_1.checkAuthenticated, (req, res) => {
    const { title, clothing_items } = req.body;
    const uid = req.user;
    const insertOutfit = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield sqlImport_1.pool.query('INSERT INTO backend_schema.outfit (title, clothing_items, uid) VALUES ($1, $2, $3)', [title, clothing_items, uid]);
            (0, responseCallback_1.responseCallbackPost)(null, res, 'Outfit');
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackPost)(error, res);
        }
    });
    void insertOutfit();
});
// Endpoint for deleting a specific outfit
router.delete('/:outfitId', auth_1.checkAuthenticated, (req, res) => {
    const { outfitId } = req.params;
    const deleteOutfit = (outfitId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteOutfit = yield sqlImport_1.pool.query('DELETE FROM backend_schema.outfit WHERE oid = $1', [outfitId]);
            (0, responseCallback_1.responseCallbackDelete)(null, outfitId, res, 'Outfit', deleteOutfit.rowCount);
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackDelete)(error, outfitId, res, 'Outfit');
        }
    });
    void deleteOutfit(outfitId);
});
// Endpoint for updating a specific outfit
router.put('/:oid', auth_1.checkAuthenticated, (req, res) => {
    // Extract outfit data from the request body
    const { oid } = req.params;
    const { title, clothing_items } = req.body;
    const updateOutfit = (oid) => __awaiter(void 0, void 0, void 0, function* () {
        // Update the outfit in the database
        try {
            const updateOutfit = yield sqlImport_1.pool.query('UPDATE backend_schema.outfit SET title = $1, clothing_items = $2 WHERE oid = $3', [title, clothing_items, oid]);
            // responds with successful update even when no changes are made
            (0, responseCallback_1.responseCallbackUpdate)(null, oid, res, 'Outfit', updateOutfit.rowCount);
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackUpdate)(error, oid, res, 'Outfit');
        }
    });
    void updateOutfit(oid);
});
