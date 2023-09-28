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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints_1 = require("./src/routes/endpoints");
const sqlImport_1 = require("./src/utils/sqlImport");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const bcrypt_1 = require("bcrypt");
const uuid_1 = require("uuid");
const passport_local_1 = require("passport-local");
const session_file_store_1 = __importDefault(require("session-file-store"));
const app = (0, express_1.default)();
const LocalStrategy = passport_local_1.Strategy;
const FileStore = (0, session_file_store_1.default)(express_session_1.default);
const timeout = require('connect-timeout');
require('dotenv').config();
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ limit: '10mb' }));
app.use(timeout(300000));
app.use((0, express_session_1.default)({
    genid: () => {
        return (0, uuid_1.v4)();
    },
    store: new FileStore(),
    secret: (_a = process.env.SESSION_SECRET) !== null && _a !== void 0 ? _a : 'layersSession',
    resave: false,
    cookie: {
        maxAge: Date.now() + 30 * 86400 * 1000,
        secure: false // !!! Make this true by once we add HTTPS
    },
    saveUninitialized: false
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
passport_1.default.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield sqlImport_1.pool.query('SELECT * FROM backend_schema.user WHERE email = $1', [email.toLowerCase()]);
        if (result.rowCount === 0) {
            console.log('in user check');
            return done(null, false, { message: 'user not found' });
        }
        const hashedPassword = result.rows[0].password;
        const passwordMatches = yield (0, bcrypt_1.compare)(password, hashedPassword);
        if (!passwordMatches) {
            console.log('Invalid Credentials');
            return done(null, false, { message: 'invalid credentials' });
        }
        const user = result.rows[0].uid;
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
app.use('/', endpoints_1.routerBase);
app.use('/api', endpoints_1.routerPublic);
app.use('/api/private', endpoints_1.routerPrivate);
app.listen(process.env.PORT, () => {
    if (process.env.PORT == null) {
        return null;
    }
    console.log(`Server is running on port ${process.env.PORT}`);
});
