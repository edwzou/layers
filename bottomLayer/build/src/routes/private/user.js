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
exports.privateUserRoute = exports.default = void 0;
const express_1 = __importDefault(require("express"));
const sqlImport_1 = require("../../utils/sqlImport");
const responseCallback_1 = require("../../utils/responseCallback");
const auth_1 = require("../../middleware/auth");
const convert_image_1 = require("../../s3/convert-image");
const multer_1 = require("../../utils/multer");
const download_url_from_s3_1 = require("../../s3/download-url-from-s3");
const router = express_1.default.Router();
exports.default = router;
exports.privateUserRoute = router;
router.get('/', auth_1.checkAuthenticated, (req, res) => {
    const userId = req.user;
    const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield sqlImport_1.pool.query('SELECT uid, first_name, last_name, email, username, pp_url FROM backend_schema.user WHERE uid = $1', [userId]);
            const result = user.rows[0];
            const imgRef = result.pp_url;
            result.pp_url = yield (0, download_url_from_s3_1.downloadURLFromS3)(imgRef);
            (0, responseCallback_1.responseCallbackGet)(null, result, res, 'User');
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackGet)(error, null, res);
        }
    });
    void getUser();
});
// Endpoint for creating a specific user
router.post('/', auth_1.checkAuthenticated, multer_1.upload.single('profile_picture'), (req, res) => {
    const { first_name, last_name, email, username, password, private_option, profile_picture, followers, following } = req.body;
    const insertUser = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const imgRef = yield (0, convert_image_1.convertImage)(profile_picture, username, false);
            yield sqlImport_1.pool.query(`
      INSERT INTO backend_schema.user (

        first_name, last_name, email, username, password, private_option, followers, following, pp_url
        ) VALUES ( 
          $1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
                first_name,
                last_name,
                email.toLowerCase(),
                username,
                password,
                private_option,
                JSON.parse(followers),
                JSON.parse(following),
                imgRef
            ]);
            (0, responseCallback_1.responseCallbackPost)(null, res, 'User');
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackPost)(error, res);
        }
    });
    void insertUser();
});
// Endpoint for deleting a specific user
router.delete('/', auth_1.checkAuthenticated, (req, res) => {
    const userId = req.user;
    if (userId == null)
        return;
    const deleteUser = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteUser = yield sqlImport_1.pool.query('DELETE FROM backend_schema.user WHERE uid = $1', [userId]);
            (0, responseCallback_1.responseCallbackDelete)(null, userId, res, 'User', deleteUser.rowCount);
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackDelete)(error, userId, res, 'User');
        }
    });
    void deleteUser();
});
// Endpoints for updating a specific user
router.put('/', auth_1.checkAuthenticated, multer_1.upload.single('profile_picture'), (req, res) => {
    const userId = req.user;
    if (userId == null)
        return;
    const { first_name, last_name, email, username, password, private_option, profile_picture, followers, following } = req.body;
    const updateUser = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const URL = yield (0, convert_image_1.convertImage)(profile_picture, username, false);
            const updateUser = yield sqlImport_1.pool.query(`UPDATE backend_schema.user
        SET first_name = $1,
            last_name = $2,
            email = $3,
            username = $4,
            password = $5,
            private_option = $6,
            followers = $7,
            following = $8,
            pp_url = $9
        WHERE uid = $10`, [
                first_name,
                last_name,
                email.toLowerCase(),
                username,
                password,
                private_option,
                JSON.parse(followers),
                JSON.parse(following),
                URL,
                userId
            ]);
            // responds with successful update even when no changes are made
            (0, responseCallback_1.responseCallbackUpdate)(null, userId, res, 'User', updateUser.rowCount);
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackUpdate)(error, userId, res, 'User');
        }
    });
    void updateUser();
});
