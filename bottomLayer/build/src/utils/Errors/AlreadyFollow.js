"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyFollowError = void 0;
class AlreadyFollowError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AlreadyFollow';
    }
}
exports.AlreadyFollowError = AlreadyFollowError;
