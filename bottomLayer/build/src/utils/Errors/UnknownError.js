"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownError = void 0;
class UnknownError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnknownError';
    }
}
exports.UnknownError = UnknownError;
