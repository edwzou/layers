import { EventEmitter } from "node:events";
import { NotFoundError } from "../../utils/Errors/NotFoundError";

export class QueryManager extends EventEmitter {
  queries: number;
  failures: string[];
  result: number = 0;
  constructor(queries: number) {
    super();
    this.queries = queries;
    this.failures = [];
  }

  allComplete() {
    this.emit("proceed", "All Queries Were Completed", this.result);
  }

  complete(query: string) {
    this.queries--;
    this.emit("Query Completed", query);
    if (this.queries === 0) {
      this.allComplete();
    }
  }

  failure(failure: string, query: string) {
    this.queries--;
    this.result--;
    console.log("Query Failed. \nQuery: " + query + "\nFailure: " + failure);
    this.failures.push(failure);
    this.emit("Query Failure Caught", query, failure);
    if (this.queries === 0) {
      this.allComplete();
    }
  }

  utterFailure(failure: string, query: string) {
    this.queries--;
    this.result -= -10;
    console.log(
      "Query Failed, Uncaught Failure. \nQuery: " +
        query +
        "\nFailure: " +
        failure,
    );
    this.emit("Query Failure Uncaught", query, failure);
    if (this.queries === 0) {
      this.allComplete();
    }
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
