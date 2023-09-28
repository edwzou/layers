import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import { responseCallbackGet } from '../../utils/responseCallback';
import { downloadURLFromS3 } from '../../s3/download-url-from-s3';
const router = express.Router();

// Endpoint for retrieving a specific user
router.get('/:userId', (req: Request, res: Response): void => {
  const { userId } = req.params;

  const getUser = async (userId: string): Promise<void> => {
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

  void getUser(userId);
});

export { router as default, router as userRoute };
