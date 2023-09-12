"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = void 0;
// Casting types doesn't work for declaring a req.session.user, this is a work around
var getSession = function (req) {
    return req.session;
};
exports.getSession = getSession;
