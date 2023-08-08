import express from 'express';
import { sql } from '../../utils/sqlImport';
import { responseCallback } from '../../utils/responseCallback';
const router = express.Router();

// Endpoint for retrieving a specific user
router.get('/:userId', (req, res): void => {
  const { userId } = req.params;

  const getUser = async (userId: string): Promise<void> => {
    try {
      const user = await sql`
        SELECT * FROM backend_schema.user
        WHERE uid = ${userId}
            AND EXISTS (
            SELECT 1 FROM backend_schema.user WHERE uid = ${userId}
            )
    `;

      const result = responseCallback(null, user);
      res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  void getUser(userId);
});

module.exports = router;
