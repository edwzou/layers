"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateSearchRoute = exports.default = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
exports.default = router;
exports.privateSearchRoute = router;
// Endpoint for searching users by username or name
router.get('/users', auth_1.checkAuthenticated, (req, res) => {
    try {
        // const { query } = req.query;
        // Perform user search logic
        res.json({ message: 'User search results' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
