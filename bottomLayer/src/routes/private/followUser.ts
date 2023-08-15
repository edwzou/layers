import express from 'express';
import { getUserCore } from '../../utils/responseCallback';
import { AlreadyFollow } from '../../utils/Errors/AlreadyFollow';
const router = express.Router();

// Endpoint for following a user, the url parameter is the user doing the following
router.post('/follow/:userId', async (req: any, res: any) => {
    const { userId } = req.params;
    const { toFollowId } = req.body
    // Perform follow user logic
    const follow = async (uid1: string, uid2: string): Promise<void> => {
      try {
        const thread1 = getUserCore(uid1)
        const thread2 = getUserCore(uid2)
        
        const user1 = await thread1
        const user2 = await thread2
        const influence = user1[0]["following"].length > user2[0]["followers"].length ? user1[0]["following"] : user2[0]["followers"]
        const new_follow = user1[0]["following"].length > user2[0]["followers"].length ? user2[0]["uid"] : user1[0]["uid"]
        if (influence.includes(new_follow)) {
          throw new AlreadyFollow(user1[0]["username"] + " is already following " + user2[0]["username"])
        }
        // write follow logic
      } catch (error) {

      }
    }
   void follow(userId, toFollowId)
});

// Endpoint for unfollowing a user
router.post('/users/:id/unfollow', async (req: any, res: any) => {
  try {
    const { uid } = req.params;
    // Perform unfollow user logic

    res.json({ message: 'User unfollowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
