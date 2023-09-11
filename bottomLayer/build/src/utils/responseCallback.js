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
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientFollowTransaction = exports.getUserCore = exports.responseCallbackGetAll = exports.responseCallbackUnFollow = exports.responseCallbackFollow = exports.responseCallbackUpdate = exports.responseCallbackDelete = exports.responseCallbackPost = exports.responseCallbackGet = exports.responseCallback = void 0;
var NotFoundError_1 = require("./Errors/NotFoundError");
var UnknownError_1 = require("./Errors/UnknownError");
var responseCallback = function (error, element) {
    if (error != null) {
        throw error;
    }
    else {
        return element;
    }
};
exports.responseCallback = responseCallback;
var responseCallbackGet = function (error, element, res, notFoundObject) {
    if (notFoundObject === void 0) { notFoundObject = ''; }
    if (error != null) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error });
        return error;
    }
    else if (element === null || element === undefined || element.length === 0) {
        res.status(400).json({ message: notFoundObject + ' Not Found' });
        return element;
    }
    else {
        res.status(200).json({ message: 'Success', data: element });
        return element;
    }
};
exports.responseCallbackGet = responseCallbackGet;
var responseCallbackPost = function (error, res, target) {
    if (target === void 0) { target = ''; }
    if (error != null) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error });
        return error;
    }
    else {
        res.status(200).json({ message: 'Successfully Created a ' + target });
        return error;
    }
};
exports.responseCallbackPost = responseCallbackPost;
var responseCallbackDelete = function (error, id, res, target, rowCount) {
    if (target === void 0) { target = ''; }
    if (rowCount === void 0) { rowCount = 1; }
    if (rowCount === 0) {
        throw new NotFoundError_1.NotFoundError(target + ' Not Found, id: ' + id);
    }
    else if (error != null) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error, Failed to Delete ' + target + ': ' + id,
            error: error
        });
        return error;
    }
    else {
        res
            .status(200)
            .json({ message: 'Successfully Deleted ' + target + ': ' + id });
        return error;
    }
};
exports.responseCallbackDelete = responseCallbackDelete;
var responseCallbackUpdate = function (error, id, res, target, rowCount) {
    if (target === void 0) { target = ''; }
    if (rowCount === void 0) { rowCount = 1; }
    if (rowCount === 0) {
        throw new NotFoundError_1.NotFoundError(target + ' Not Found, id: ' + id);
    }
    else if (error != null) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error, Failed to Delete ' + target + ': ' + id, error: error });
        return error;
    }
    else {
        res
            .status(200)
            .json({ message: 'Successfully Updated ' + target + ': ' + id });
        return error;
    }
};
exports.responseCallbackUpdate = responseCallbackUpdate;
var responseCallbackFollow = function (error, uid1, uid2, res) {
    if (error != null) {
        console.log(error);
        res.status(500).json({
            // Where following and follower are the uids
            message: 'Internal Server Error: ' + uid1 + ' Failed to Follow ' + uid2,
            error: error
        });
        return error;
    }
    else {
        res
            .status(200)
            .json({ message: uid1 + ' Successfully Followed ' + uid2 });
        return error;
    }
};
exports.responseCallbackFollow = responseCallbackFollow;
var responseCallbackUnFollow = function (error, username, toUnFollowUsername, res) {
    if (error != null) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error: ' +
                username +
                ' Failed to unFollow ' +
                toUnFollowUsername,
            error: error
        });
        return error;
    }
    else {
        res
            .status(200)
            .json({
            message: username + ' Successfully UnFollowed ' + toUnFollowUsername
        });
        return error;
    }
};
exports.responseCallbackUnFollow = responseCallbackUnFollow;
var responseCallbackGetAll = function (element, res, notFoundObject) {
    if (notFoundObject === void 0) { notFoundObject = ''; }
    if (element === null || element === undefined || element.length === 0) {
        res.status(400).json({ message: 'This User has no ' + notFoundObject });
        return element;
    }
    else {
        res.status(200).json({ message: 'Success', data: element });
        return element;
    }
};
exports.responseCallbackGetAll = responseCallbackGetAll;
var getUserCore = function (userId, client) { return __awaiter(void 0, void 0, void 0, function () {
    var result, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query('SELECT * FROM backend_schema.user WHERE uid = $1', [userId])];
            case 1:
                result = _a.sent();
                user = result.rows;
                if (user.length === 0) {
                    throw new NotFoundError_1.NotFoundError('User Not Found, uid: ' + userId);
                }
                return [2 /*return*/, (0, exports.responseCallback)(null, user)];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, (0, exports.responseCallback)(error_1, null)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserCore = getUserCore;
var clientFollowTransaction = function (uid, query, client, otherQueries, resolution) {
    if (resolution === void 0) { resolution = -1; }
    return __awaiter(void 0, void 0, void 0, function () {
        var clientOn, result, i, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client];
                case 1:
                    clientOn = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, , 8]);
                    return [4 /*yield*/, clientOn.query('BEGIN')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, clientOn.query(query)];
                case 4:
                    result = _a.sent();
                    resolution = result.rowCount;
                    if (resolution === 0) {
                        throw new NotFoundError_1.NotFoundError('User Not Found, uid: ' + uid);
                    }
                    for (i = 0; i < otherQueries.length; i++) {
                        while (otherQueries[i] === -1) {
                            continue;
                        }
                        if (otherQueries[i] === 0) {
                            throw new UnknownError_1.UnknownError('The error is unknown in this method');
                        }
                    }
                    return [4 /*yield*/, clientOn.query('COMMIT')];
                case 5:
                    _a.sent();
                    return [2 /*return*/, (0, exports.responseCallback)(null, true)];
                case 6:
                    error_2 = _a.sent();
                    return [4 /*yield*/, clientOn.query('ROLLBACK')];
                case 7:
                    _a.sent();
                    if (error_2 instanceof UnknownError_1.UnknownError) {
                        return [2 /*return*/, (0, exports.responseCallback)(null, 'Unknown Error')];
                    }
                    else if (error_2 instanceof NotFoundError_1.NotFoundError) {
                        return [2 /*return*/, (0, exports.responseCallback)(null, 'NotFound Error')];
                    }
                    return [2 /*return*/, (0, exports.responseCallback)(error_2, null)];
                case 8: return [2 /*return*/];
            }
        });
    });
};
exports.clientFollowTransaction = clientFollowTransaction;
