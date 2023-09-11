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
var responseCallback_1 = require("../../utils/responseCallback");
var sqlImport_1 = require("../../utils/sqlImport");
var router = express_1.default.Router();
// Endpoint for following a user, the url parameter is the user doing the following
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/follow/:userId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, toFollowId, client1, client2, res1, res2, res3, errors, follow;
    return __generator(this, function (_a) {
        userId = req.params.userId;
        toFollowId = req.body.toFollowId;
        console.log(userId, toFollowId);
        client1 = sqlImport_1.pool.connect();
        client2 = sqlImport_1.pool.connect();
        res1 = -1;
        res2 = -1;
        res3 = -1;
        errors = [];
        follow = function (uid1, uid2) { return __awaiter(void 0, void 0, void 0, function () {
            var following, follower, user, followingT, followerT, _a, _b, _c, _d, error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 4, 5, 8]);
                        following = "\n          UPDATE backend_schema.user\n          SET following = array_append(following, ".concat(uid1, ")\n          WHERE uid = ").concat(uid2, "\n            AND ").concat(uid1, " <> ALL (following)\n        ");
                        follower = "\n        UPDATE backend_schema.user \n          SET followers = array_append(followers, ".concat(uid2, ")\n          WHERE uid = ").concat(uid1, "\n            AND ").concat(uid2, " <> ALL (followers)\n        ");
                        user = sqlImport_1.pool.query('SELECT * FROM backend_schema.user WHERE uid = $1', [userId]);
                        followingT = (0, responseCallback_1.clientFollowTransaction)(uid2, following, client1, [res1, res3], res2);
                        followerT = (0, responseCallback_1.clientFollowTransaction)(uid1, follower, client2, [res1, res2], res3);
                        return [4 /*yield*/, user];
                    case 1:
                        res1 = (_e.sent()).rows.length;
                        if (res1 === 0) {
                            errors.push('User1 Not Found');
                        }
                        else {
                            errors.push('true'); // !!! @Joe, is this what you meant?
                        }
                        _b = (_a = errors).push;
                        return [4 /*yield*/, followingT];
                    case 2:
                        _b.apply(_a, [_e.sent()]);
                        _d = (_c = errors).push;
                        return [4 /*yield*/, followerT];
                    case 3:
                        _d.apply(_c, [_e.sent()]);
                        // if (errors[0]
                        // const following = await pool.query(
                        // `
                        // UPDATE backend_schema.user
                        //   SET following = array_append(following, $1)
                        //   WHERE uid = $2
                        //     AND $1 <> ALL (following)
                        //     AND EXISTS (SELECT 1 FROM backend_schema.user WHERE uid = $2)`,
                        //   [uid1, uid2]
                        // );
                        // const follower = await pool.query(
                        // `
                        // UPDATE backend_schema.user
                        //   SET followers = array_append(followers, $1)
                        //   WHERE uid = $2
                        //     AND $1 <> ALL (followers)`,
                        //   [uid2, uid1]
                        // );
                        // console.log(following)
                        (0, responseCallback_1.responseCallbackFollow)(null, uid1, uid2, res);
                        return [3 /*break*/, 8];
                    case 4:
                        error_1 = _e.sent();
                        (0, responseCallback_1.responseCallbackFollow)(error_1, uid1, uid2, res);
                        return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, client1];
                    case 6:
                        (_e.sent()).release;
                        return [4 /*yield*/, client2];
                    case 7:
                        (_e.sent()).release;
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        void follow(userId, toFollowId);
        return [2 /*return*/];
    });
}); });
// Endpoint for unfollowing a user, the url parameter is the user doing the unfollowing
router.post('/unfollow/:userId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, unFollowId, unfollow;
    return __generator(this, function (_a) {
        userId = req.params.userId;
        unFollowId = req.body.unFollowId;
        unfollow = function (uid1, uid2) { return __awaiter(void 0, void 0, void 0, function () {
            var following, followers, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        following = sqlImport_1.pool.query("\n      UPDATE backend_schema.user\n        SET following = ARRAY_REMOVE(following, $1)\n        WHERE uid = $2", [uid1, uid2]);
                        followers = sqlImport_1.pool.query("\n      UPDATE backend_schema.user\n        SET followers = ARRAY_REMOVE(followers, $1)\n        WHERE uid = $2", [uid2, uid1]);
                        // const result1 = await thread1
                        // const result2 = await thread2
                        // const user1 = result1.rows[0]
                        // const user2 = result2.rows[0];
                        return [4 /*yield*/, following];
                    case 1:
                        // const result1 = await thread1
                        // const result2 = await thread2
                        // const user1 = result1.rows[0]
                        // const user2 = result2.rows[0];
                        _a.sent();
                        return [4 /*yield*/, followers];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        (0, responseCallback_1.responseCallbackFollow)(error_2, uid1, uid2, res);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        void unfollow(userId, unFollowId);
        return [2 /*return*/];
    });
}); });
module.exports = router;
