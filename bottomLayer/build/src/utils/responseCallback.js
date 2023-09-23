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
Object.defineProperty(exports, "__esModule", { value: true });
exports.revertFollowQuery = exports.clientUndoFollowTransaction = exports.clientFollow = exports.clientUnFollow = exports.getUserCore = exports.responseCallbackGetAll = exports.responseCallbackUnFollow = exports.responseCallbackFollow = exports.responseCallbackUpdate = exports.responseCallbackDelete = exports.responseCallbackSignUp = exports.responseCallbackPost = exports.responseCallbackConnect = exports.responseCallbackGet = exports.responseCallback = void 0;
const NotFoundError_1 = require("./Errors/NotFoundError");
const UnknownError_1 = require("./Errors/UnknownError");
const node_events_1 = require("node:events");
const responseCallback = (error, element) => {
    if (error != null) {
        throw error;
    }
    else {
        return element;
    }
};
exports.responseCallback = responseCallback;
// All get calls to postgresql should fail if rowcount === 0
const responseCallbackGet = (error, element, res, notFoundObject = '') => {
    if (error != null) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', err: error });
        return error;
    }
    else if (element.length === 0) {
        res.status(400).json({ message: notFoundObject + ' Not Found' });
        return element;
    }
    else {
        res.status(200).json({ message: 'Success', data: element });
        return element;
    }
};
exports.responseCallbackGet = responseCallbackGet;
const responseCallbackConnect = (error, res) => {
    if (error != null) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error: Failed To Connect To Pool',
            err: error,
            log: error.message
        });
        return error;
    }
    else {
        res.status(200).json({
            message: 'Successfully Connected to Pool'
        });
        return error;
    }
};
exports.responseCallbackConnect = responseCallbackConnect;
const responseCallbackPost = (error, res, target = '') => {
    if (error != null) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', err: error });
        return error;
    }
    else {
        res.status(200).json({ message: 'Successfully Created a ' + target });
        return error;
    }
};
exports.responseCallbackPost = responseCallbackPost;
const responseCallbackSignUp = (error, res) => {
    if (error != null) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', err: error });
        return error;
    }
    else {
        res.status(200).json({ message: 'Successfully Signed Up' });
        return error;
    }
};
exports.responseCallbackSignUp = responseCallbackSignUp;
const responseCallbackDelete = (error, id, res, target = '', rowCount = 1) => {
    if (rowCount === 0) {
        throw new NotFoundError_1.NotFoundError(target + ' Not Found, id: ' + id);
    }
    else if (error != null) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error, Failed to Delete ' + target + ': ' + id,
            error
        });
        return error;
    }
    else {
        res
            .status(200)
            .json({ message: 'Successfully Deleted ' + target + ': ' + id });
        return error;
    }
};
exports.responseCallbackDelete = responseCallbackDelete;
const responseCallbackUpdate = (error, id, res, target = '', rowCount = 1) => {
    if (rowCount === 0) {
        throw new NotFoundError_1.NotFoundError(target + ' Not Found, id: ' + id);
    }
    else if (error != null) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error, Failed to Update ' + target + ': ' + id,
            err: error
        });
        return error;
    }
    else {
        res
            .status(200)
            .json({ message: 'Successfully Updated ' + target + ': ' + id });
        return error;
    }
};
exports.responseCallbackUpdate = responseCallbackUpdate;
const responseCallbackFollow = (error, followerId, followedId, res) => {
    if (error != null) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error: ' +
                followerId +
                ' Failed to Follow ' +
                followedId,
            err: error,
            log: error.message
        });
        return error;
    }
    else {
        res
            .status(200)
            .json({ message: followerId + ' Successfully Followed ' + followedId });
        return error;
    }
};
exports.responseCallbackFollow = responseCallbackFollow;
const responseCallbackUnFollow = (error, unfollowerId, unfollowedId, res) => {
    if (error != null) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error: ' +
                unfollowerId +
                ' Failed to UnFollow ' +
                unfollowedId,
            err: error,
            log: error.message
        });
        return error;
    }
    else {
        res.status(200).json({
            message: unfollowerId + ' Successfully UnFollowed ' + unfollowedId
        });
        return error;
    }
};
exports.responseCallbackUnFollow = responseCallbackUnFollow;
const responseCallbackGetAll = (element, res, notFoundObject = '') => {
    if (element === null || element === undefined || element.length === 0) {
        res.status(400).json({ message: 'This User has no ' + notFoundObject });
        return element;
    }
    else {
        res.status(200).json({ message: 'Success', data: element });
        return element;
    }
};
exports.responseCallbackGetAll = responseCallbackGetAll;
const getUserCore = (userId, client) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query('SELECT * FROM backend_schema.user WHERE uid = $1', [userId]);
        const user = result.rows;
        if (user.length === 0) {
            throw new NotFoundError_1.NotFoundError('User Not Found, uid: ' + userId);
        }
        return (0, exports.responseCallback)(null, user);
    }
    catch (error) {
        return (0, exports.responseCallback)(error, null);
    }
});
exports.getUserCore = getUserCore;
const clientUnFollow = (uid, query, client, queryEmitter, failure = '') => __awaiter(void 0, void 0, void 0, function* () {
    const clientOn = yield client;
    try {
        const queryTrigger = (0, node_events_1.once)(queryEmitter, 'proceed');
        const result = yield clientOn.query(query);
        if (result.rowCount === 0) {
            queryEmitter.failure(failure, query);
            throw new NotFoundError_1.NotFoundError('No change in user, uid: ' + uid);
        }
        else {
            queryEmitter.complete(query);
        }
        const resolution = yield queryTrigger;
        // One optimization is to move the following code before the query is even called
        // So as to skip the query if a failure is triggered before the query is sent.
        // If we were to throw an error from the emitter, then we wouldn't be sure what happens to the query sent afterwards.
        // Given that the failure will most likely occur while the query is running
        // Also since the queries are all sent together at relatively the same time, it is highly unlikely the query will fail
        // before the other queries are sent
        if (resolution[1] < 0) {
            throw new UnknownError_1.UnknownError('The error is unknown in this method.');
        }
        return (0, exports.responseCallback)(null, null);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.name === UnknownError_1.UnknownError.name) {
                // this is only called on 0,1
                return (0, exports.responseCallback)(null, 'Error is unknown to this query, query:\n' + query);
            }
            else if (error.name === NotFoundError_1.NotFoundError.name) {
                return (0, exports.responseCallback)(null, 'No change in user, uid: ' + uid);
            }
            queryEmitter.utterFailure(error.message, query);
            return (0, exports.responseCallback)(error, null);
        }
    }
});
exports.clientUnFollow = clientUnFollow;
const clientFollow = (uid, query, client, queryEmitter, failure = '') => __awaiter(void 0, void 0, void 0, function* () {
    const clientOn = yield client;
    try {
        const queryTrigger = (0, node_events_1.once)(queryEmitter, 'proceed');
        const result = yield clientOn.query(query);
        if (result.rowCount === 0) {
            queryEmitter.failure(failure, query);
            throw new NotFoundError_1.NotFoundError('No change in user, uid: ' + uid);
        }
        else {
            queryEmitter.complete(query);
        }
        const resolution = yield queryTrigger;
        // One optimization is to move the following code before the query is even called
        // So as to skip the query if a failure is triggered before the query is sent.
        // If we were to throw an error from the emitter, then we wouldn't be sure what happens to the query sent afterwards.
        // Given that the failure will most likely occur while the query is running
        // Also since the queries are all sent together at relatively the same time, it is highly unlikely the query will fail
        // before the other queries are sent
        if (resolution[1] < 0) {
            throw new UnknownError_1.UnknownError('The error is unknown in this method, need to revert its changes.');
        }
        return (0, exports.responseCallback)(null, null);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.name === UnknownError_1.UnknownError.name) {
                // this is only called on 0,1
                return yield (0, exports.clientUndoFollowTransaction)(uid, (0, exports.revertFollowQuery)(query), clientOn);
            }
            else if (error.name === NotFoundError_1.NotFoundError.name) {
                return (0, exports.responseCallback)(null, 'No change in user, uid: ' + uid);
            }
            queryEmitter.utterFailure(error.message, query);
            return (0, exports.responseCallback)(error, null);
        }
    }
});
exports.clientFollow = clientFollow;
const clientUndoFollowTransaction = (uid, query, client) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.query('BEGIN');
        const result = yield client.query(query);
        if (result.rowCount === 0) {
            throw new Error('No change in user while reverting initial query, uid: ' + uid);
        }
        yield client.query('COMMIT');
        return (0, exports.responseCallback)(null, 'Follow request reverted for uid: ' + uid + '\n with query: ' + query);
    }
    catch (error) {
        yield client.query('ROLLBACK');
        return (0, exports.responseCallback)(null, 'No change in user while reverting initial query, uid: ' + uid);
    }
});
exports.clientUndoFollowTransaction = clientUndoFollowTransaction;
const revertFollowQuery = (query) => {
    const remove = query.replace('array_append', 'array_remove');
    const indexOfAnd = remove.indexOf('AND');
    const reversion = remove.substring(0, indexOfAnd);
    return reversion;
};
exports.revertFollowQuery = revertFollowQuery;
