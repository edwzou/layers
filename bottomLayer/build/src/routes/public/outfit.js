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
exports.outfitRoute = exports.default = void 0;
const express_1 = __importDefault(require("express"));
const sqlImport_1 = require("../../utils/sqlImport");
const responseCallback_1 = require("../../utils/responseCallback");
const router = express_1.default.Router();
exports.default = router;
exports.outfitRoute = router;
// Endpoint for retrieving a specific outfit
router.get('/:outfitId', (req, res) => {
    const { outfitId } = req.params;
    const getOutfitById = (outfitId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const outfit = yield sqlImport_1.pool.query('SELECT * FROM backend_schema.outfit WHERE oid = $1', [outfitId]);
            const result = outfit.rows;
            (0, responseCallback_1.responseCallbackGet)(null, result, res, 'Outfits');
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackGet)(error, null, res);
        }
    });
    void getOutfitById(outfitId);
});
// Endpoint for retrieving all outfits
router.get('/u/:userId', (req, res) => {
    const { userId } = req.params;
    const client = sqlImport_1.pool.connect();
    // Query outfits for the specified user
    const getAllOutfits = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const run = sqlImport_1.pool.query('SELECT * FROM backend_schema.outfit WHERE uid = $1', [userId]);
            yield (0, responseCallback_1.getUserCore)(userId, yield client);
            const result = yield run;
            const outfits = result.rows;
            (0, responseCallback_1.responseCallbackGetAll)(outfits, res, 'Outfits');
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackGet)(error, null, res);
        }
        finally {
            (yield client).release();
        }
    });
    void getAllOutfits(userId);
});
