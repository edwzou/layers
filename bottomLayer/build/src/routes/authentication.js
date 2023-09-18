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
exports.authRoute = exports.default = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const sqlImport_1 = require("../utils/sqlImport");
const multer_1 = require("../utils/multer");
const convert_image_1 = require("../s3/convert-image");
const bcrypt = require('bcrypt');
const router = express_1.default.Router();
exports.default = router;
exports.authRoute = router;
router.post('/login', passport_1.default.authenticate('login', {
    failureMessage: true,
    successRedirect: '/api/private/users'
}));
router.post('/signup', multer_1.upload.single('profile_picture'), (req, res, next) => {
    const { first_name, last_name, email, username, password, private_option, profile_picture } = req.body;
    const createUser = () => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPass = yield bcrypt.hash(password, 10);
        const URL = yield (0, convert_image_1.convertImage)(profile_picture, username, false);
        const user = yield sqlImport_1.pool.query(`
  INSERT INTO backend_schema.user (
    first_name, last_name, email, username, password, private_option, followers, following, pp_url
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
            first_name,
            last_name,
            email.toLowerCase(),
            username,
            hashedPass,
            private_option,
            [],
            [],
            URL
        ]);
        if (user.rowCount > 0) {
            next();
        }
        else {
            res.status(500).send('User not created');
        }
    });
    void createUser();
}, passport_1.default.authenticate('login', {
    failureMessage: true,
    successRedirect: '/api/private/users'
}));
router.get('/logout', (req, res, next) => {
    req.logOut((err) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (err) {
            return next(err);
        }
        res.send('Logged Out');
    });
});
