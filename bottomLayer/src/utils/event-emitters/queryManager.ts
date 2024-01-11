import { EventEmitter } from 'node:events';
import { NotFoundError } from '../../utils/Errors/NotFoundError';

export class QueryManager extends EventEmitter {
	queries: number;
	failures: string[];
	result: number = 0;
	constructor(queries: number) {
		super();
		this.queries = queries;
		this.failures = [];
	}

	// All queries are complete
	allComplete() {
		this.emit('proceed', 'All Queries Were Completed', this.result);
	}

	// One query completed
	complete(query: string) {
		this.queries--;
		this.emit('Query Completed', query);
		if (this.queries === 0) {
			this.allComplete();
		}
	}

	// One query failed and the failure is predicted
	failure(failure: string, query: string) {
		this.queries--;
		this.result--;
		this.failures.push(failure);
		this.emit('Query Failure Caught', query, failure);
		if (this.queries === 0) {
			this.allComplete();
		}
	}

	// One query faield and the failure is unknown
	utterFailure(failure: string, query: string) {
		this.queries--;
		this.result -= 10;
		this.emit('Query Failure Uncaught', query, failure);
		if (this.queries === 0) {
			this.allComplete();
		}
	}

	// Summurize the failures for follow endpoint
	resolveFollowErrorLog(followerId: string, followedId: string) {
		if (this.failures.length > 0) {
			if (this.failures.length === 3) {
				throw new NotFoundError(
					'None of the users referenced in the follow request exist\nfollower: ' +
						followerId +
						'\nfollowed: ' +
						followedId
				);
			} else if (this.failures.length === 2) {
				if (this.failures[0].length > 17 || this.failures[1].length > 17) {
					throw new NotFoundError(
						'The Follower User (the user doing the following) Referenced in the Follow Request does not Exist\nfollowerId: ' +
							followerId
					);
				} else {
					throw new NotFoundError(
						'The Follower User (the user doing the following) \nfollowerId: ' +
							followerId +
							' already follows \nfollowedId: ' +
							followedId
					);
				}
			} else {
				throw new NotFoundError(
					'The Followed User (the user being followed) Referenced in the Follow Request does not exist\nfollowedId: ' +
						followedId
				);
			}
		}
	}

	// Summurize the failures for unfollow endpoint
	resolveUnFollowErrorLog(unfollowerId: string, unfollowedId: string) {
		if (this.failures.length > 0) {
			if (this.failures.length === 3) {
				throw new NotFoundError(
					'None of the users referenced in the unfollow request exist\nunfollower: ' +
						unfollowerId +
						'\nunfollowed: ' +
						unfollowedId
				);
			} else if (this.failures.length === 2) {
				if (this.failures[0].length > 19 || this.failures[1].length > 19) {
					throw new NotFoundError(
						'The UnFollower User (the user doing the unfollowing) Referenced in the Unfollow Request does not Exist\nunfollowerId: ' +
							unfollowerId
					);
				} else {
					throw new NotFoundError(
						'The Unfollowed User (the user being unfollowed) Referenced in the Unfollow Request does not exist\nunfollowedId: ' +
							unfollowedId
					);
				}
			} else {
				throw new NotFoundError(
					'The Unfollower User (the user doing the unfollowing) \nunfollowerId: ' +
						unfollowerId +
						' does not follow \nunfollowedId: ' +
						unfollowedId
				);
			}
		}
	}
}
