import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import { getUserCore, responseCallbackDelete, responseCallbackGet, responseCallbackPost, responseCallbackUpdate } from '../../utils/responseCallback';
import { checkAuthenticated } from '../../middleware/auth';
const router = express.Router();

// Endpoint for creating a specific user
router.post('/', checkAuthenticated, (req: Request, res: Response) => {
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

// Endpoint for retrieving a specific user
router.get('/', (req: Request, res: Response): void => {
  const userId = req.user;

  const getUser = async (): Promise<void> => {
    try {
      const user = await pool.query('SELECT uid, first_name, last_name, email, username, profile_picture FROM backend_schema.user WHERE uid = $1', [userId]);
      const result = user.rows[0];

      responseCallbackGet(null, result, res, 'User');
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  void getUser();
});

// Endpoint for deleting a specific user
router.delete('/', checkAuthenticated, (req: Request, res: Response): void => {
  const userId = req.user as string;

  if (userId == null) return;

  const deleteUser = async (): Promise<void> => {
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

  void deleteUser();
});

// Endpoints for updating a specific user
router.put('/', checkAuthenticated, (req: Request, res: Response): void => {
  const userId = req.user as string;

  if (userId == null) return;

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
  const updateUser = async (): Promise<void> => {
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

  void updateUser();
});

module.exports = router;
