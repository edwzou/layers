"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = void 0;
// Casting types doesn't work for declaring a req.session.user, this is a work around
const getSession = (req) => {
    return req.session;
};
exports.getSession = getSession;
