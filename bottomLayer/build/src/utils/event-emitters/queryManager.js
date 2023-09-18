"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryManager = void 0;
const node_events_1 = require("node:events");
const NotFoundError_1 = require("../../utils/Errors/NotFoundError");
class QueryManager extends node_events_1.EventEmitter {
    constructor(queries) {
        super();
        this.result = 0;
        this.queries = queries;
        this.failures = [];
    }
    // All queries are complete
    allComplete() {
        this.emit('proceed', 'All Queries Were Completed', this.result);
    }
    // One query completed
    complete(query) {
        this.queries--;
        this.emit('Query Completed', query);
        if (this.queries === 0) {
            this.allComplete();
        }
    }
    // One query failed and the failure is predicted
    failure(failure, query) {
        this.queries--;
        this.result--;
        console.log('Query Failed. \nQuery: ' + query + '\nFailure: ' + failure);
        this.failures.push(failure);
        this.emit('Query Failure Caught', query, failure);
        if (this.queries === 0) {
            this.allComplete();
        }
    }
    // One query faield and the failure is unknown
    utterFailure(failure, query) {
        this.queries--;
        this.result -= 10;
        console.log('Query Failed, Uncaught Failure. \nQuery: ' +
            query +
            '\nFailure: ' +
            failure);
        this.emit('Query Failure Uncaught', query, failure);
        if (this.queries === 0) {
            this.allComplete();
        }
    }
    // Summurize the failures for follow endpoint
    resolveFollowErrorLog(followerId, followedId) {
        if (this.failures.length > 0) {
            if (this.failures.length === 3) {
                throw new NotFoundError_1.NotFoundError('None of the users referenced in the follow request exist\nfollower: ' +
                    followerId +
                    '\nfollowed: ' +
                    followedId);
            }
            else if (this.failures.length === 2) {
                if (this.failures[0].length > 17 || this.failures[1].length > 17) {
                    throw new NotFoundError_1.NotFoundError('The Follower User (the user doing the following) Referenced in the Follow Request does not Exist\nfollowerId: ' +
                        followerId);
                }
                else {
                    throw new NotFoundError_1.NotFoundError('The Follower User (the user doing the following) \nfollowerId: ' +
                        followerId +
                        ' already follows \nfollowedId: ' +
                        followedId);
                }
            }
            else {
                throw new NotFoundError_1.NotFoundError('The Followed User (the user being followed) Referenced in the Follow Request does not exist\nfollowedId: ' +
                    followedId);
            }
        }
    }
    // Summurize the failures for unfollow endpoint
    resolveUnFollowErrorLog(unfollowerId, unfollowedId) {
        console.log('Failures: ', this.failures);
        if (this.failures.length > 0) {
            if (this.failures.length === 3) {
                throw new NotFoundError_1.NotFoundError('None of the users referenced in the unfollow request exist\nunfollower: ' +
                    unfollowerId +
                    '\nunfollowed: ' +
                    unfollowedId);
            }
            else if (this.failures.length === 2) {
                if (this.failures[0].length > 19 || this.failures[1].length > 19) {
                    throw new NotFoundError_1.NotFoundError('The UnFollower User (the user doing the unfollowing) Referenced in the Unfollow Request does not Exist\nunfollowerId: ' +
                        unfollowerId);
                }
                else {
                    throw new NotFoundError_1.NotFoundError('The Unfollowed User (the user being unfollowed) Referenced in the Unfollow Request does not exist\nunfollowedId: ' +
                        unfollowedId);
                }
            }
            else {
                throw new NotFoundError_1.NotFoundError('The Unfollower User (the user doing the unfollowing) \nunfollowerId: ' +
                    unfollowerId +
                    ' does not follow \nunfollowedId: ' +
                    unfollowedId);
            }
        }
    }
}
exports.QueryManager = QueryManager;
