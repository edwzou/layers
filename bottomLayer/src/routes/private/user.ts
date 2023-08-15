import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import { getUserCore, responseCallbackDelete, responseCallbackPost, responseCallbackUpdate } from '../../utils/responseCallback';
const router = express.Router();

// Endpoint for creating a specific user
router.post('/', (req: Request, res: Response) => {
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
      await pool.query(`
      INSERT INTO backend_schema.user (
        first_name, last_name, email, username, password, private, followers, following, profile_picture
        ) VALUES ( 
          $1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [first_name, last_name, email, username, password, privateOption, followers, following, profile_picture]);

      responseCallbackPost(null, res, 'User');
    } catch (error) {
      responseCallbackPost(error, res);
    }
  };
  void insertUser();
});

// Endpoint for deleting a specific user
router.delete('/:userId', (req: Request, res: Response): void => {
  const { userId } = req.params;
  const deleteUser = async (userId: string): Promise<void> => {
    try {
      // Although the following will take extra time, since delete is such a hefty method
      // it should be fine
      await getUserCore(userId);
      await pool.query('DELETE FROM backend_schema.user WHERE uid = $1', [userId]);

      responseCallbackDelete(null, userId, res, 'User');
    } catch (error) {
      responseCallbackDelete(error, userId, res);
    }
  };

  void deleteUser(userId);
});

// Endpoints for updating a specific user
router.put('/:userId', (req: Request, res: Response): void => {
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
      await pool.query(`UPDATE backend_schema.user
        SET first_name = $1,
            last_name = $2,
            email = $3,
            username = $4,
            password = $5,
            private = $6,
            followers = $7,
            following = $8,
            profile_picture = $9
        WHERE uid = $10`,
      [first_name, last_name, email, username, password, privateOption, followers, following, profile_picture, userId]);
      await run;
      // responds with successful update even when no changes are made
      console.log('test1', run);
      responseCallbackUpdate(null, userId, res, 'User');
    } catch (error) {
      console.log('test2', error);
      responseCallbackUpdate(error, userId, res);
    }
  };

  void updateUser(userId);
});

module.exports = router;
