import express from 'express';
import { clientFollowTransaction, clientFollowTransaction2, getUserCore, responseCallbackFollow, responseCallbackUnFollow } from '../../utils/responseCallback';
import { AlreadyFollowError } from '../../utils/Errors/AlreadyFollow';
import { pool } from '../../utils/sqlImport';
import { NotFoundError } from '../../utils/Errors/NotFoundError';
const router = express.Router();



// Endpoint for following a user, the url parameter is the user doing the following
router.post('/follow/:userId', async (req: any, res: any) => {
    const { userId } = req.params;
    const { toFollowId } = req.body
    console.log(userId, toFollowId)

    const client1 = pool.connect();
    const client2 = pool.connect();

    var res1 = -1;
    var res2 = -1;
    var res3 = -1;
    const errors: string[] = []
    const queries = [res1, res2, res3]

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

        If double 0 and all three queries return errors none of the users exist
        If double 0 and 2 follow queries return errors the two users are following each other already
        If one 0 and 2 queries 1 follow and 1 user the user doesn't exist
        If one 0 and 1 follow query the other user doesn't exist
        I believe these are all the cases
        */

        const following = `
          UPDATE backend_schema.user
          SET following = array_append(following, '${uid1}')
          WHERE uid = '${uid2}'
            AND '${uid1}' <> ALL (following)
        `;

        const follower = `
        UPDATE backend_schema.user 
          SET followers = array_append(followers, '${uid2}')
          WHERE uid = '${uid1}'
            AND '${uid2}' <> ALL (followers)
        `;

        const user = pool.query(
          "SELECT * FROM backend_schema.user WHERE uid = $1",
          [uid1]
        );

        const followingT = clientFollowTransaction(uid2, following, client1, 1, queries)
        const followerT = clientFollowTransaction2(uid1, follower, client2, 2, queries);
        queries[0] = (await user).rows.length
        if (queries[0] === 0) {
          errors.push('User Not Found, uid: ' + uid1)
        }
        console.log("BReak1: ", queries)
        errors.push(await followingT)
        errors.push(await followerT)
        if (errors.length > 0) {
          if (errors.length == 3) {
            throw new NotFoundError('None of the users referenced in the follow request exist\nuid1: ' + uid1 + '\nuid2: ' + uid2)
          } else if (errors.length == 2) {
            if (!errors[0].startsWith('User Not Found, uid: ')) {
              throw new NotFoundError('These two users already follow each other\nuid1: ' + uid1 + '\nuid2: ' + uid2)
            } else {
              throw new NotFoundError('One of the users referenced in the follow request does not exist\nuid1: ' + uid1)
            }
          } else {
            throw new NotFoundError(
              "One of the users referenced in the follow request does not exist\nuid2: " +
                uid2
            );
          }
        }
        console.log("errors: ", errors)
        responseCallbackFollow(null, uid1, uid2, res);
      } catch (error) {
        responseCallbackFollow(error, uid1, uid2, res)
      } finally {
        (await client1).release;
        (await client2).release;
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
