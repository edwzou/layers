import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import {
  responseCallbackDelete,
  responseCallbackUpdate,
  responseCallbackGet
} from '../../utils/responseCallback';
import { hash } from 'bcrypt';
import { convertImage } from '../../s3/convert-image';
import { upload } from '../../utils/multer';
import { downloadURLFromS3 } from '../../s3/download-url-from-s3';
import { User } from '../../types/user';
const router = express.Router();

// Endpooint for getting the current user
// Need this private get endpoint because the user may have private data that cannot be shared
router.get('/', (req: Request, res: Response): void => {
  const userId = req.user as string;
  const getUser = async (): Promise<void> => {
    try {
      const user = await pool.query(
        'SELECT * FROM backend_schema.user WHERE uid = $1',
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
    const fieldsToUpdate: User = req.body;
    let queryParams = [];
    let queryFields = [];

    const updateUser = async (): Promise<void> => {
      let query = 'UPDATE backend_schema.user SET';

      let passAsync = null;

      if (fieldsToUpdate.password !== undefined) {
        passAsync = hash(fieldsToUpdate.password, 10);
      }

      if (fieldsToUpdate.first_name !== undefined) {
        query += 'first_name = ' + fieldsToUpdate.first_name + ',';
      }

      if (fieldsToUpdate.last_name !== undefined) {
        query += 'last_name = ' + fieldsToUpdate.last_name + ',';
      }

      if (fieldsToUpdate.email !== undefined) {
        query += 'email = ' + fieldsToUpdate.email.toLowerCase() + ',';
      }

      if (fieldsToUpdate.username !== undefined) {
        query += 'username = ' + fieldsToUpdate.username + ',';
      }

      if (fieldsToUpdate.password !== undefined) {
        const hashedPass = await passAsync;
        if (hashedPass === null) {
          throw new Error('Impossible Null value occured');
        }
        query += 'password = ' + hashedPass + ',';
      }

      if (fieldsToUpdate.private_option !== undefined) {
        query +=
          'private_option = ' + fieldsToUpdate.private_option.toString() + ',';
      }
    };

    if (fieldsToUpdate.profile_picture) {
      const imgRef = await convertImage(
        fieldsToUpdate.profile_picture,
        userId,
        false
      );
      queryFields.push('pp_url = $' + (queryParams.length + 1));
      queryParams.push(imgRef);
    }

    if (fieldsToUpdate.followers) {
      queryFields.push('followers = $' + (queryParams.length + 1));
      queryParams.push(fieldsToUpdate.followers);
    }

    if (fieldsToUpdate.following) {
      queryFields.push('following = $' + (queryParams.length + 1));
      queryParams.push(fieldsToUpdate.following);
    }

    if (queryFields.length === 0) {
      return res.status(400).send('No fields provided for update');
    }

    query = `UPDATE backend_schema.user SET ${queryFields.join(
      ', '
    )} WHERE uid = $${queryParams.length + 1}`;
    queryParams.push(userId);

    try {
      const updateUser = await pool.query(query, queryParams);

      // Fetch the updated user data
      const updatedUser = await pool.query(
        'SELECT * FROM backend_schema.user WHERE uid = $1',
        [userId]
      );
      responseCallbackUpdate(
        null,
        updatedUser.rows[0],
        res,
        'User',
        updateUser.rowCount
      );
    } catch (error) {
      responseCallbackUpdate(error, userId, res, 'User');
    }
  }
);

export { router as default, router as privateUserRoute };
