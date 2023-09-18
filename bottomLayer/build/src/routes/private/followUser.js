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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateFollowUserRoute = exports.default = void 0;
const express_1 = __importDefault(require("express"));
const responseCallback_1 = require("../../utils/responseCallback");
const sqlImport_1 = require("../../utils/sqlImport");
const node_events_1 = require("node:events");
const queryManager_1 = require("../../utils/event-emitters/queryManager");
const router = express_1.default.Router();
exports.default = router;
exports.privateFollowUserRoute = router;
// Endpoint for following a user, the url parameter is the user doing the following
router.post('/follow/:followerId', (req, res) => {
    // The followedId is the person getting followed. Follower is the following.
    const { followerId } = req.params;
    const { followedId } = req.body;
    if (followerId === followedId) {
        throw new Error('User is trying to follow themself, uid: ' + followerId);
    }
    // Perform follow user logic
    const follow = (followerId, followedId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const client1 = sqlImport_1.pool.connect();
            const client2 = sqlImport_1.pool.connect();
            try {
                /*
                Following query user issues:
                1. The following user can be a non existing user, and return a rowcount of 1
                2. If the user is already following that user, returns rowcount 0
                3. If followed user is non existent return rowcount 0
                Follower query user issues:
                1. The follower user can be a non existing user, and return a rowcount of 1
                2. If the user is already a follower of that user, returns rowcount 0
                3. If following user is non existent return rowcount 0
        
                1. So if double 0, the two users are both following each other already, or both users are non-existent.
                2. If 1,0 one of the users is non-existent, Same with 0,1
                3. If 1,1 successfully followed the user
                The above follows under the assumption that if a user if following another user, he is already in their followers.
        
                If double 0 and all three queries return errors none of the users exist
                If double 0 and 2 follow queries return errors the two users are following each other already
                If one 0 and 2 queries 1 follow and 1 user the user doesn't exist
                If one 0 and 1 follow query the other user doesn't exist
                I believe these are all the cases
                */
                // Adds followed to the follower's followings array
                const following = `
          UPDATE backend_schema.user
          SET following = array_append(following, '${followedId}')
          WHERE uid = '${followerId}'
            AND '${followedId}' <> ALL (following)
        `;
                // Adds follower to the followed's followers array
                const follower = `
        UPDATE backend_schema.user 
          SET followers = array_append(followers, '${followerId}')
          WHERE uid = '${followedId}'
            AND '${followerId}' <> ALL (followers)
        `;
                const queryManager = new queryManager_1.QueryManager(3);
                const queryTrigger = (0, node_events_1.once)(queryManager, 'proceed');
                const followingQ = (0, responseCallback_1.clientFollow)(followerId, following, client1, queryManager, 'Following failure');
                const followerQ = (0, responseCallback_1.clientFollow)(followedId, follower, client2, queryManager, 'Follower failure');
                // Check if the Follower User Exists
                const followerUser = yield sqlImport_1.pool.query('SELECT * FROM backend_schema.user WHERE uid = $1', [followerId]);
                if (followerUser.rows.length === 0) {
                    queryManager.failure('Follower User (the user doing the following) Not Found, uid: ' +
                        followerId, 'SELECT * FROM backend_schema.user WHERE uid = $1');
                }
                else {
                    queryManager.complete('SELECT * FROM backend_schema.user WHERE uid = $1');
                }
                const resolution = yield queryTrigger;
                if (resolution[1] < 0) {
                    // this is waiting for either followingQ and followerQ to revert changes
                    yield followingQ;
                    yield followerQ;
                    queryManager.resolveFollowErrorLog(followerId, followedId);
                }
                (0, responseCallback_1.responseCallbackFollow)(null, followerId, followedId, res);
            }
            catch (error) {
                (0, responseCallback_1.responseCallbackFollow)(error, followerId, followedId, res);
            }
            finally {
                (yield client1).release();
                (yield client2).release();
            }
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackConnect)(error, res);
        }
    });
    void follow(followerId, followedId);
});
// Endpoint for unfollowing a user, the url parameter is the user doing the unfollowing
router.post('/unfollow/:unfollowerId', (req, res) => {
    const { unfollowerId } = req.params;
    const { unfollowedId } = req.body;
    if (unfollowerId === unfollowedId) {
        throw new Error('User is trying to unfollow themself, uid: ' + unfollowerId);
    }
    const unfollow = (unfollowerId, unfollowedId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const client1 = sqlImport_1.pool.connect();
            const client2 = sqlImport_1.pool.connect();
            try {
                /*
                Unfollow query user issues:
                Should be almost identical to follow query user issues,
                except instead of adding to an array we remove instead
        
                Reverting the unfollow request is not needed
                As if a user doesn't exist which causes the caught errors to arise.
                Removing a non-existent User from an array would do nothing.
              */
                // Removes unfollowed from the unfollower's followings array
                const unfollowing = `
          UPDATE backend_schema.user
          SET following = array_remove(following, '${unfollowedId}')
          WHERE uid = '${unfollowerId}'
            AND '${unfollowedId}' = ANY(following)
        `;
                // Removes unfollower from the unfollowed's followers array
                const unfollower = `
        UPDATE backend_schema.user 
          SET followers = array_remove(followers, '${unfollowerId}')
          WHERE uid = '${unfollowedId}'
        `;
                const queryManager = new queryManager_1.QueryManager(3);
                const queryTrigger = (0, node_events_1.once)(queryManager, 'proceed');
                const unFollowingQ = (0, responseCallback_1.clientUnFollow)(unfollowerId, unfollowing, client1, queryManager, 'UnFollowing failure');
                const unFollowerQ = (0, responseCallback_1.clientUnFollow)(unfollowedId, unfollower, client2, queryManager, 'UnFollower failure');
                // Check if the Unfollower User Exists
                const unfollowerUser = yield sqlImport_1.pool.query('SELECT * FROM backend_schema.user WHERE uid = $1', [unfollowerId]);
                if (unfollowerUser.rows.length === 0) {
                    queryManager.failure('UnFollower User (the user doing the unfollowing) Not Found, uid: ' +
                        unfollowerId, 'SELECT * FROM backend_schema.user WHERE uid = $1');
                }
                else {
                    queryManager.complete('SELECT * FROM backend_schema.user WHERE uid = $1');
                }
                const resolution = yield queryTrigger;
                if (resolution[1] < 0) {
                    // Note the following awaits are not needed because they should finish when they emit the events retrieved by queryTrigger
                    yield unFollowingQ;
                    yield unFollowerQ;
                    queryManager.resolveUnFollowErrorLog(unfollowerId, unfollowedId);
                }
                (0, responseCallback_1.responseCallbackUnFollow)(null, unfollowerId, unfollowedId, res);
            }
            catch (error) {
                (0, responseCallback_1.responseCallbackUnFollow)(error, unfollowerId, unfollowedId, res);
            }
            finally {
                (yield client1).release();
                (yield client2).release();
            }
        }
        catch (error) {
            (0, responseCallback_1.responseCallbackConnect)(error, res);
        }
    });
    void unfollow(unfollowerId, unfollowedId);
});
