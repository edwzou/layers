"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PG_USER, PG_PASSWORD, PG_HOST, PG_DATABASE, ENDPOINT_ID } = process.env;
const checkValues = (value) => {
    if (value === undefined) {
        return '';
    }
    return value;
};
const POSTGRES_URL = `postgres://${checkValues(PG_USER)}:${checkValues(PG_PASSWORD)}@${checkValues(PG_HOST)}/${checkValues(PG_DATABASE)}?options=project%3D${checkValues(ENDPOINT_ID)}&sslmode=require`;
exports.pool = new pg_1.Pool({
    connectionString: POSTGRES_URL,
    ssl: true
});
