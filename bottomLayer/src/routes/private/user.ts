import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import { getUserCore, responseCallbackDelete, responseCallbackPost, responseCallbackUpdate } from '../../utils/responseCallback';
import { NotFoundError } from '../../utils/Errors/NotFoundError';
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
        first_name, last_name, email, username, password, privateOption, followers, following, profile_picture
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
      const deleteUser = await pool.query('DELETE FROM backend_schema.user WHERE uid = $1', [userId]);
      responseCallbackDelete(null, userId, res, 'User', deleteUser.rowCount);
    } catch (error) {
      responseCallbackDelete(error, userId, res, 'User');
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
      const updateUser = await pool.query(`UPDATE backend_schema.user
        SET first_name = $1,
            last_name = $2,
            email = $3,
            username = $4,
            password = $5,
            privateOption = $6,
            followers = $7,
            following = $8,
            profile_picture = $9
        WHERE uid = $10`,
      [first_name, last_name, email, username, password, privateOption, followers, following, profile_picture, userId]);
      // responds with successful update even when no changes are made
      responseCallbackUpdate(null, userId, res, 'User', updateUser.rowCount);
    } catch (error) {
      responseCallbackUpdate(error, userId, res, 'User');
    }
  };

  void updateUser(userId);
});

module.exports = router;
