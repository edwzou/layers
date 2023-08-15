import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import { responseCallbackGet } from '../../utils/responseCallback';
const router = express.Router();

// Endpoint for retrieving a specific user
router.get('/:userId', (req: Request, res: Response): void => {
  const { userId } = req.params;

  const getUser = async (userId: string): Promise<void> => {
    try {
      const user = await pool.query('SELECT * FROM backend_schema.user WHERE uid = $1', [userId]);
      const result = user.rows[0];

      responseCallbackGet(null, result, res, 'User');
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  void getUser(userId);
});

module.exports = router;
