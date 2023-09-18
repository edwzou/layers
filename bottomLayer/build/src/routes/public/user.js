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
exports.userRoute = exports.default = void 0;
const express_1 = __importDefault(require("express"));
const sqlImport_1 = require("../../utils/sqlImport");
const responseCallback_1 = require("../../utils/responseCallback");
const router = express_1.default.Router();
exports.default = router;
exports.userRoute = router;
// Endpoint for retrieving a specific user
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield sqlImport_1.pool.query('SELECT * FROM backend_schema.user WHERE uid = $1', [userId]);
            const result = user.rows;
            (0, responseCallback_1.responseCallbackGet)(null, result, res, 'User');
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackGet)(error, null, res);
        }
    });
    void getUser(userId);
});
