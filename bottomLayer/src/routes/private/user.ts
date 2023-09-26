import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import {
  responseCallbackDelete,
  responseCallbackUpdate,
  responseCallbackGet
} from '../../utils/responseCallback';
import { convertImage } from '../../s3/convert-image';
import { upload } from '../../utils/multer';
import { downloadURLFromS3 } from '../../s3/download-url-from-s3';
const router = express.Router();

// Endpooint for getting the current user
// Need this private get endpoint because the user may have private data that cannot be shared
router.get('/', (req: Request, res: Response): void => {
  const userId = req.user;
  const getUser = async (): Promise<void> => {
    try {
      const user = await pool.query(
        'SELECT uid, first_name, last_name, email, username, private_option, followers, following, pp_url FROM backend_schema.user WHERE uid = $1',
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

// Endpoint for deleting a specific user
router.delete('/', (req: Request, res: Response): void => {
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
