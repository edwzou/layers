import express from 'express';
import { getUserCore, getUserCoreNoError, responseCallback, responseCallbackFollow, responseCallbackUnFollow } from '../../utils/responseCallback';
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
        const thread1 = getUserCore(uid1)
        const thread2 = getUserCore(uid2)
        const following = pool.query(`
        UPDATE backend_schema.user
          SET following = array_append(following, $1)
          WHERE uid = $2`, [uid1, uid2]);
        const followers = await pool.query(`
        UPDATE backend_schema.user
          SET followers = array_append(followers, $1)
          WHERE uid = $2`, [uid2, uid1]);
        console.log("test4", uid1, uid2);
        console.log("test5", thread1, thread2);
        const user1 = await thread1
        console.log("test8");
        const user2 = await thread2
        console.log("test7", user1);
        await following;
        console.log("test3", user1["following"]);
        const influence = user1["following"].length > user2["followers"].length ? user1["following"] : user2["followers"]
        const new_follow = user1["following"].length > user2["followers"].length ? user2["uid"] : user1["uid"]
        if (influence.includes(new_follow)) {
          console.log("test6");
          throw new AlreadyFollowError(user1["username"] + " is already following " + user2["username"])
        } else if (user1.length === 0) {
          console.log("test1")
          throw new NotFoundError("User Not Found, uid: " + user1["uid"])
        } else if (user2.length === 0) {
          console.log("test2");
          throw new NotFoundError("User Not Found, uid: " + user2["uid"])
        }
        responseCallbackFollow(null, user1["username"], user2["username"], res)
      } catch (error) {
        if (error instanceof AlreadyFollowError || error instanceof NotFoundError) {
          try {
            const unFollowing = pool.query(`
              UPDATE backend_schema.user
                SET following = ARRAY_REMOVE(following, $1)
                WHERE uid = $2`, [uid1, uid2]);
            const unFollowers = pool.query(`
            UPDATE backend_schema.user
              SET followers = ARRAY_REMOVE(followers, $1)
              WHERE uid = $2`, [uid2, uid1]);
            await unFollowing
            await unFollowers
          } catch (error) {
            responseCallbackUnFollow(error, uid1, uid2, res)
          }
        }
        responseCallbackFollow(error, "", "", res)
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
      const thread1 = getUserCore(uid1);
      const thread2 = getUserCore(uid2);
      const following = pool.query(`
      UPDATE backend_schema.user
        SET following = ARRAY_REMOVE(following, $1)
        WHERE uid = $2`, [uid1, uid2]);
      const followers = pool.query(`
      UPDATE backend_schema.user
        SET followers = ARRAY_REMOVE(followers, $1)
        WHERE uid = $2`, [uid2, uid1]);
      
      const result1 = await thread1
      const result2 = await thread2
      const user1 = result1.rows[0]
      const user2 = result2.rows[0];
      await following;
      await followers;
      responseCallbackUnFollow(null, user1["username"], user2["username"], res)
    } catch (error) {
      responseCallbackFollow(error, uid1, uid2, res)
    }
  }
  void unfollow(userId, unFollowId)
});

module.exports = router;
