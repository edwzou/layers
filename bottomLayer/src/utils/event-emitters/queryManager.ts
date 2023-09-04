import { EventEmitter } from "node:events";
import { NotFoundError } from "../../utils/Errors/NotFoundError";

export class QueryManager extends EventEmitter {
  queries: number;
  failures: string[];
  constructor(queries: number) {
    super();
    this.queries = queries;
    this.failures = [];
  }

  allComplete(result: number) {
    this.emit("proceed", "All Queries Were Completed", result);
  }

  complete(query: string) {
    this.queries--;
    this.emit("Query Completed", query);
    if (this.queries === 0) {
      this.allComplete(1);
    }
  }

  failure(failure: string, query: string) {
    this.queries--;
    this.failures.push(failure);
    this.emit("Query Failure Caught", query, failure);
    if (this.queries === 0) {
      this.allComplete(-1);
    }
  }

  utterFailure(failure: string, query: string) {
    this.queries = -1;
    this.emit("proceed", "Query Failure Uncaught", -2, query, failure);
  }

  resolveErrorLog(followerId: string, followedId: string) {
    if (this.failures.length > 0) {
      if (this.failures.length == 3) {
        throw new NotFoundError(
          "None of the users referenced in the follow request exist\nfollower: " +
            followerId +
            "\nfollowed: " +
            followedId,
        );
      } else if (this.failures.length == 2) {
        if (this.failures[0].length > 16 || this.failures[1].length > 16) {
          throw new NotFoundError(
            "The Follower User (the user doing the following) Referenced in the Follow Request does not Exist\nfollowerId: " +
              followerId,
          );
        } else {
          throw new NotFoundError(
            "The Follower User (the user doing the following) \nfollowerId: " +
              followerId +
              "already follows \nfollowedId: " +
              followedId,
          );
        }
      } else {
        throw new NotFoundError(
          "The Followed User (the user being followed) Referenced in the Follow Request does not exist\nfollowedId: " +
            followedId,
        );
      }
    }
  }
}
