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
var convert_image_1 = require("../../s3/convert-image");
var router = express_1.default.Router();
router.get('/', function (req, res) {
    var userId = req.user;
    var getUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sqlImport_1.pool.query('SELECT uid, first_name, last_name, email, username, profile_picture FROM backend_schema.user WHERE uid = $1', [userId])];
                case 1:
                    user = _a.sent();
                    result = user.rows[0];
                    (0, responseCallback_1.responseCallbackGet)(null, result, res, 'User');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    (0, responseCallback_1.responseCallbackGet)(error_1, null, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    void getUser();
});
// Endpoint for creating a specific user
router.post('/', auth_1.checkAuthenticated, function (req, res) {
    var _a = req.body, first_name = _a.first_name, last_name = _a.last_name, email = _a.email, username = _a.username, password = _a.password, private_option = _a.private_option, profile_picture = _a.profile_picture, followers = _a.followers, following = _a.following;
    (0, convert_image_1.convertImage)(profile_picture, username, false);
    var insertUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sqlImport_1.pool.query("\n      INSERT INTO backend_schema.user (\n        first_name, last_name, email, username, password, private_option, followers, following, profile_picture\n        ) VALUES ( \n          $1, $2, $3, $4, $5, $6, $7, $8, $9)", [
                            first_name,
                            last_name,
                            email,
                            username,
                            password,
                            private_option,
                            followers,
                            following,
                            profile_picture
                        ])];
                case 1:
                    _a.sent();
                    (0, responseCallback_1.responseCallbackPost)(null, res, 'User');
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    (0, responseCallback_1.responseCallbackPost)(error_2, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    void insertUser();
});
// Endpoint for deleting a specific user
router.delete('/', auth_1.checkAuthenticated, function (req, res) {
    var userId = req.user;
    if (userId == null)
        return;
    var deleteUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var deleteUser_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sqlImport_1.pool.query('DELETE FROM backend_schema.user WHERE uid = $1', [userId])];
                case 1:
                    deleteUser_1 = _a.sent();
                    (0, responseCallback_1.responseCallbackDelete)(null, userId, res, 'User', deleteUser_1.rowCount);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    (0, responseCallback_1.responseCallbackDelete)(error_3, userId, res, 'User');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    void deleteUser();
});
// Endpoints for updating a specific user
router.put('/', auth_1.checkAuthenticated, function (req, res) {
    var userId = req.user;
    if (userId == null)
        return;
    var _a = req.body, first_name = _a.first_name, last_name = _a.last_name, email = _a.email, username = _a.username, password = _a.password, private_option = _a.private_option, profile_picture = _a.profile_picture, followers = _a.followers, following = _a.following;
    var updateUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var URL_1, updateUser_1, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, convert_image_1.convertImage)(profile_picture, username, false)];
                case 1:
                    URL_1 = _a.sent();
                    return [4 /*yield*/, sqlImport_1.pool.query("UPDATE backend_schema.user\n        SET first_name = $1,\n            last_name = $2,\n            email = $3,\n            username = $4,\n            password = $5,\n            private_option = $6,\n            followers = $7,\n            following = $8,\n            profile_picture = $9\n        WHERE uid = $10", [
                            first_name,
                            last_name,
                            email,
                            username,
                            password,
                            private_option,
                            followers,
                            following,
                            URL_1,
                            userId
                        ])];
                case 2:
                    updateUser_1 = _a.sent();
                    // responds with successful update even when no changes are made
                    (0, responseCallback_1.responseCallbackUpdate)(null, userId, res, 'User', updateUser_1.rowCount);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    (0, responseCallback_1.responseCallbackUpdate)(error_4, userId, res, 'User');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    void updateUser();
});
module.exports = router;
