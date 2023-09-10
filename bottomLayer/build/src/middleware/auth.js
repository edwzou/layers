"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthenticated = void 0;
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
exports.checkAuthenticated = checkAuthenticated;
