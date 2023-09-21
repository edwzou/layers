import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import {
  responseCallbackDelete,
  responseCallbackPost,
  responseCallbackUpdate,
  responseCallbackGet
} from '../../utils/responseCallback';
import { checkAuthenticated } from '../../middleware/auth';
import { convertImage } from '../../s3/convert-image';
import { upload } from '../../utils/multer';
import { downloadURLFromS3 } from '../../s3/download-url-from-s3';
const router = express.Router();

router.get('/', checkAuthenticated, (req: Request, res: Response): void => {
  const userId = req.user;
  const getUser = async (): Promise<void> => {
    try {
      const user = await pool.query(
        'SELECT uid, first_name, last_name, email, username, pp_url FROM backend_schema.user WHERE uid = $1',
        [userId]
      );
      const result = user.rows[0];
      const imgRef = result.pp_url;
      result.pp_url = await downloadURLFromS3(imgRef);

      responseCallbackGet(null, result, res, 'User');
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };
  void getUser();
});

// Endpoint for creating a specific user
router.post(
  '/',
  checkAuthenticated,
  upload.single('profile_picture'),
  (req: Request, res: Response) => {
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      private_option,
      profile_picture,
      followers,
      following
    } = req.body;
    const insertUser = async (): Promise<void> => {
      try {
        const imgRef = await convertImage(profile_picture, username, false);
        await pool.query(
          `
      INSERT INTO backend_schema.user (

        first_name, last_name, email, username, password, private_option, followers, following, pp_url
        ) VALUES ( 
          $1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            first_name,
            last_name,
            email.toLowerCase(),
            username,
            password,
            private_option,
            JSON.parse(followers),
            JSON.parse(following),
            imgRef
          ]
        );

        responseCallbackPost(null, res, 'User');
      } catch (error) {
        responseCallbackPost(error, res);
      }
    };
    void insertUser();
  }
);

// Endpoint for deleting a specific user
router.delete('/', checkAuthenticated, (req: Request, res: Response): void => {
  const userId = req.user as string;
  if (userId == null) return;
  const deleteUser = async (): Promise<void> => {
    try {
      const deleteUser = await pool.query(
        'DELETE FROM backend_schema.user WHERE uid = $1',
        [userId]
      );
      responseCallbackDelete(null, userId, res, 'User', deleteUser.rowCount);
    } catch (error) {
      responseCallbackDelete(error, userId, res, 'User');
    }
  };
  void deleteUser();
});

// Endpoints for updating a specific user
router.put(
  '/',
  checkAuthenticated,
  upload.single('profile_picture'),
  (req: Request, res: Response): void => {
    const userId = req.user as string;
    if (userId == null) return;
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      private_option,
      profile_picture,
      followers,
      following
    } = req.body;
    const updateUser = async (): Promise<void> => {
      try {
        const imgRef = await convertImage(profile_picture, username, false);
        const updateUser = await pool.query(
          `UPDATE backend_schema.user
        SET first_name = $1,
            last_name = $2,
            email = $3,
            username = $4,
            password = $5,
            private_option = $6,
            followers = $7,
            following = $8,
            pp_url = $9
        WHERE uid = $10`,
          [
            first_name,
            last_name,
            email.toLowerCase(),
            username,
            password,
            private_option,
            JSON.parse(followers),
            JSON.parse(following),
            imgRef,
            userId
          ]
        );
        // responds with successful update even when no changes are made
        responseCallbackUpdate(null, userId, res, 'User', updateUser.rowCount);
      } catch (error) {
        responseCallbackUpdate(error, userId, res, 'User');
      }
    };
    void updateUser();
  }
);

export { router as default, router as privateUserRoute };
