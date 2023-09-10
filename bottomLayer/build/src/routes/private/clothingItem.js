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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sqlImport_1 = require("../../utils/sqlImport");
var responseCallback_1 = require("../../utils/responseCallback");
var auth_1 = require("../../middleware/auth");
var router = express_1.default.Router();
// Endpoint for creating a specific clothing item
router.post('/', auth_1.checkAuthenticated, function (req, res) {
    var _a = req.body, image = _a.image, category = _a.category, title = _a.title, brands = _a.brands, size = _a.size, color = _a.color;
    var uid = req.user;
    var insertClothingItem = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sqlImport_1.pool.query("INSERT INTO backend_schema.clothing_item (image, category, title, brands, size, color, uid)\n      VALUES ($1, $2, $3, $4, $5, $6, $7)", [image, category, title, brands, size, color, uid])];
                case 1:
                    _a.sent();
                    (0, responseCallback_1.responseCallbackPost)(null, res, 'Clothing Item');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    (0, responseCallback_1.responseCallbackPost)(error_1, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    void insertClothingItem();
});
// Endpoint for deleting a specific outfit
router.delete('/:ciid', auth_1.checkAuthenticated, function (req, res) {
    var ciid = req.params.ciid;
    var deleteItem = function (ciid) { return __awaiter(void 0, void 0, void 0, function () {
        var deleteItem_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sqlImport_1.pool.query('DELETE FROM backend_schema.clothing_item WHERE ciid = $1', [ciid])];
                case 1:
                    deleteItem_1 = _a.sent();
                    (0, responseCallback_1.responseCallbackDelete)(null, ciid, res, 'Clothing Item', deleteItem_1.rowCount);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    (0, responseCallback_1.responseCallbackDelete)(error_2, ciid, res, 'Clothing Item');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    void deleteItem(ciid);
});
// Endpoint for updating a specific outfit
router.put('/:ciid', auth_1.checkAuthenticated, function (req, res) {
    // Extract outfit data from the request body
    var ciid = req.params.ciid;
    var _a = req.body, image = _a.image, category = _a.category, title = _a.title, brands = _a.brands, size = _a.size, color = _a.color;
    var updateItem = function (ciid) { return __awaiter(void 0, void 0, void 0, function () {
        var updateItem_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sqlImport_1.pool.query("\n        UPDATE backend_schema.clothing_item\n        SET image = $1,\n            category = $2,\n            title = $3,\n            brands = $4,\n            size = $5,\n            color = $6\n        WHERE ciid = $7\n        ", [image, category, title, brands, size, color, ciid])];
                case 1:
                    updateItem_1 = _a.sent();
                    // responds with successful update even when no changes are made
                    (0, responseCallback_1.responseCallbackUpdate)(null, ciid, res, "Clothing Item", updateItem_1.rowCount);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    (0, responseCallback_1.responseCallbackUpdate)(error_3, ciid, res, 'Clothing Item');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    void updateItem(ciid);
});
module.exports = router;
