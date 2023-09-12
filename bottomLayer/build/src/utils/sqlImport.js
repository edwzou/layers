"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, PG_USER = _a.PG_USER, PG_PASSWORD = _a.PG_PASSWORD, PG_HOST = _a.PG_HOST, PG_DATABASE = _a.PG_DATABASE, ENDPOINT_ID = _a.ENDPOINT_ID;
var checkValues = function (value) {
    if (value === undefined) {
        return '';
    }
    return value;
};
var POSTGRES_URL = "postgres://".concat(checkValues(PG_USER), ":").concat(checkValues(PG_PASSWORD), "@").concat(checkValues(PG_HOST), "/").concat(checkValues(PG_DATABASE), "?options=project%3D").concat(checkValues(ENDPOINT_ID));
exports.pool = new pg_1.Pool({
    connectionString: POSTGRES_URL,
    ssl: true
});
