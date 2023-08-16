import express from 'express';
import { getUserCore, responseCallbackFollow, responseCallbackUnFollow } from '../../utils/responseCallback';
import { AlreadyFollowError } from '../../utils/Errors/AlreadyFollow';
import { pool } from '../../utils/sqlImport';
import { NotFoundError } from '../../utils/Errors/NotFoundError';
const router = express.Router();

// Endpoint for following a user, the url parameter is the user doing the following
router.post('/follow/:userId', async (req: any, res: any) => {
    const { userId } = req.params;
    const { toFollowId } = req.body
    console.log(userId, toFollowId)
    // Perform follow user logic
    const follow = async (uid1: string, uid2: string): Promise<void> => {
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
        */
        const following = await pool.query(
          `
        UPDATE backend_schema.user
          SET following = array_append(following, $1)
          WHERE uid = $2
            AND $1 <> ALL (following)
            AND EXISTS (SELECT 1 FROM backend_schema.user WHERE uid = $2)`,
          [uid1, uid2]
        );
        const follower = await pool.query(
          `
        UPDATE backend_schema.user
          SET followers = array_append(followers, $1)
          WHERE uid = $2
            AND $1 <> ALL (followers)`,
          [uid2, uid1]
        );
        console.log(following)
        responseCallbackFollow(null, following, follower, res);
      } catch (error) {
        responseCallbackFollow(error, uid1, uid2, res)
      }
    }
   void follow(userId, toFollowId)
});

// Endpoint for unfollowing a user, the url parameter is the user doing the unfollowing
router.post('/unfollow/:userId', async (req: any, res: any) => {
  const { userId } = req.params;
  const { unFollowId } = req.body;
    // Perform unfollow user logic

  const unfollow = async (uid1: string, uid2: string): Promise<void> => {
    try {
      // const thread1 = getUserCore(uid1);
      // const thread2 = getUserCore(uid2);
      const following = pool.query(`
      UPDATE backend_schema.user
        SET following = ARRAY_REMOVE(following, $1)
        WHERE uid = $2`, [uid1, uid2]);
      const followers = pool.query(`
      UPDATE backend_schema.user
        SET followers = ARRAY_REMOVE(followers, $1)
        WHERE uid = $2`, [uid2, uid1]);
      
      // const result1 = await thread1
      // const result2 = await thread2
      // const user1 = result1.rows[0]
      // const user2 = result2.rows[0];
      await following;
      await followers;
      // responseCallbackUnFollow(null, user1["username"], user2["username"], res)
    } catch (error) {
      responseCallbackFollow(error, uid1, uid2, res)
    }
  }
  void unfollow(userId, unFollowId)
});

module.exports = router;
