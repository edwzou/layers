import express from 'express';
import { sql } from '../../utils/sqlImport';
import { getUserCore, responseCallbackDelete, responseCallbackGet, responseCallbackPost, responseCallbackUpdate } from '../../utils/responseCallback';
const router = express.Router();

// Endpoint for creating a specific user
router.post('/', (req, res) => {
  const {
    first_name,
    last_name,
    email,
    username,
    password,
    privateOption,
    profile_picture,
    followers,
    following
  } = req.body;

  const insertUser = async (): Promise<void> => {
    try {
      await sql`
          INSERT INTO backend_schema.user (
              first_name,
              last_name,
              email,
              username,
              password,
              private,
              followers,
              following,
              profile_picture
          ) VALUES (
              ${first_name},
              ${last_name},
              ${email},
              ${username},
              ${password},
              ${privateOption},
              ${followers},
              ${following},
              ${profile_picture}
          )
        `;

      responseCallbackPost(null, res, 'User');
    } catch (error) {
      responseCallbackPost(error, res);
    }
  };
  void insertUser();
});

// Endpoint for deleting a specific user
router.delete('/:userId', (req, res): void => {
  const { userId } = req.params;
  const deleteUser = async (userId: string): Promise<void> => {
    try {
      // Although the following will take extra time, since delete is such a hefty method
      // it should be fine
      const user = await getUserCore(userId);
      await sql`DELETE FROM backend_schema.user WHERE uid = ${userId}`;

      responseCallbackDelete(null, userId, res, user, 'User');
    } catch (error) {
      responseCallbackDelete(error, userId, res);
    }
  };

  void deleteUser(userId);
});

// Endpoints for updating a specific user
router.put('/:userId', (req, res): void => {
  const { userId } = req.params;
  const {
    first_name,
    last_name,
    email,
    username,
    password,
    privateOption,
    profile_picture,
    followers,
    following
  } = req.body;
  const updateUser = async (userId: string): Promise<void> => {
    try {
      const run = getUserCore(userId);
      // console.log(user);
      await sql`UPDATE backend_schema.user
          SET first_name = ${first_name},
              last_name = ${last_name},
              email = ${email},
              username = ${username},
              password = ${password},
              private = ${privateOption},
              followers = ${followers},
              following = ${following},
              profile_picture = ${profile_picture}
          WHERE uid = ${userId}`;
      const user = await run;
      // responds with successful update even when no changes are made
      responseCallbackUpdate(null, userId, res, user, 'User');
    } catch (error) {
      responseCallbackUpdate(error, userId, res);
    }
  };

  void updateUser(userId);
});

module.exports = router;
