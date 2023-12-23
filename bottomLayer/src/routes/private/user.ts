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
import { type User } from '../../types/user';
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

    const updateUser = async (): Promise<void> => {
      let query = 'UPDATE backend_schema.user SET';

      let passAsync = null;
      let ppAsync = null;

      try {
        if (fieldsToUpdate.profile_picture !== undefined) {
          ppAsync = convertImage(fieldsToUpdate.profile_picture, userId, false);
        }

        if (fieldsToUpdate.password !== undefined) {
          passAsync = hash(fieldsToUpdate.password, 10);
        }

        if (fieldsToUpdate.first_name !== undefined) {
          query += ` first_name = '${fieldsToUpdate.first_name}',`;
        }

        if (fieldsToUpdate.last_name !== undefined) {
          query += ` last_name = '${fieldsToUpdate.last_name}',`;
        }

        if (fieldsToUpdate.email !== undefined) {
          query += ` email = '${fieldsToUpdate.email.toLowerCase()}',`;
        }

        if (fieldsToUpdate.username !== undefined) {
          query += ` username = '${fieldsToUpdate.username}',`;
        }

        if (fieldsToUpdate.password !== undefined) {
          const hashedPass = await passAsync;
          if (hashedPass === null) {
            throw new Error('Impossible Null value occured');
          }
          query += ` password = '${hashedPass}',`;
        }

        if (fieldsToUpdate.private_option !== undefined) {
          query += ` private_option = '${fieldsToUpdate.private_option.toString()}',`;
        }
        if (fieldsToUpdate.profile_picture !== undefined) {
          const pp_url = await ppAsync;
          if (pp_url === null) {
            throw new Error('Impossible Null value occured');
          }
          query += ` pp_url = '${pp_url}',`;
        }

        if (fieldsToUpdate.followers !== undefined) {
          query +=
            ' followers = ' +
            'ARRAY[' +
            fieldsToUpdate.followers.join(', ') +
            ']::UUID[]' +
            ',';
        }

        if (fieldsToUpdate.following !== undefined) {
          query +=
            ' following = ' +
            'ARRAY[' +
            fieldsToUpdate.following.join(', ') +
            ']::UUID[]' +
            ',';
        }

        if (query === 'UPDATE backend_schema.user SET') {
          throw new Error('No Fields To Update');
        }

        query = query.slice(0, -1);
        query += ` WHERE uid = '${userId}'`;

        const update = await pool.query(query);

        // Not sure if this returns updated user data also not sure if returning the new user data is needed
        responseCallbackUpdate(null, userId, res, 'User', update.rowCount);
      } catch (error) {
        responseCallbackUpdate(error, userId, res, 'User');
      }
    };

    void updateUser();
  }
);

export { router as default, router as privateUserRoute };
