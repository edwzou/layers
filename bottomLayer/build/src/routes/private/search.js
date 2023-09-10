"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../../middleware/auth");
var router = express_1.default.Router();
// Endpoint for searching users by username or name
router.get('/users', auth_1.checkAuthenticated, function (req, res) {
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
module.exports = router;
