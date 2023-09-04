import express from "express";
import {
  clientFollow,
  responseCallbackFollow,
} from "../../utils/responseCallback";
import { pool } from "../../utils/sqlImport";
import { once } from "node:events";
import { QueryManager } from "../../utils/event-emitters/queryManager";
const router = express.Router();

// Endpoint for following a user, the url parameter is the user doing the following
router.post("/follow/:followerId", async (req: any, res: any) => {
  // The followedId is the person getting followed. Follower is the following.
  const { followerId } = req.params;
  const { followedId } = req.body;
  console.log(followerId, followedId);

  const client1 = pool.connect();
  const client2 = pool.connect();

  // Perform follow user logic
  const follow = async (
    followerId: string,
    followedId: string,
  ): Promise<void> => {
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

      const queryManager = new QueryManager(3);

      const queryTrigger = once(queryManager, "proceed");

      const followingQ = clientFollow(
        followerId,
        following,
        client1,
        queryManager,
        "Following failure",
      );
      const followerQ = clientFollow(
        followedId,
        follower,
        client2,
        queryManager,
        "Follower failure",
      );

      // Check if the Follower User Exists
      const followerUser = await pool.query(
        "SELECT * FROM backend_schema.user WHERE uid = $1",
        [followerId],
      );
      if (followerUser.rows.length === 0) {
        queryManager.failure(
          "Follower User (the user doing the following) Not Found, uid: " +
            followerId,
          "SELECT * FROM backend_schema.user WHERE uid = $1",
        );
      } else {
        queryManager.complete(
          "SELECT * FROM backend_schema.user WHERE uid = $1",
        );
      }

      const resolution = await queryTrigger;
      if (resolution[1] < 0) {
        await followingQ;
        await followerQ;
        queryManager.resolveErrorLog(followerId, followedId);
      }

      responseCallbackFollow(null, followerId, followedId, res);
    } catch (error) {
      responseCallbackFollow(error, followerId, followedId, res);
    } finally {
      (await client1).release;
      (await client2).release;
    }
  };
  void follow(followerId, followedId);
});

// Endpoint for unfollowing a user, the url parameter is the user doing the unfollowing
router.post("/unfollow/:userId", async (req: any, res: any) => {
  const { userId } = req.params;
  const { unFollowId } = req.body;
  // Perform unfollow user logic

  const unfollow = async (uid1: string, uid2: string): Promise<void> => {
    try {
      // const thread1 = getUserCore(uid1);
      // const thread2 = getUserCore(uid2);
      const following = pool.query(
        `
      UPDATE backend_schema.user
        SET following = ARRAY_REMOVE(following, $1)
        WHERE uid = $2`,
        [uid1, uid2],
      );
      const followers = pool.query(
        `
      UPDATE backend_schema.user
        SET followers = ARRAY_REMOVE(followers, $1)
        WHERE uid = $2`,
        [uid2, uid1],
      );

      // const result1 = await thread1
      // const result2 = await thread2
      // const user1 = result1.rows[0]
      // const user2 = result2.rows[0];
      await following;
      await followers;
      // responseCallbackUnFollow(null, user1["username"], user2["username"], res)
    } catch (error) {
      responseCallbackFollow(error, uid1, uid2, res);
    }
  };
  void unfollow(userId, unFollowId);
});

module.exports = router;
