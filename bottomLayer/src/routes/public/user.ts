import express from 'express';
import { sql } from '../../utils/sql-import';
const router = express.Router();

type Callback<T> = (error: Error | null, result: T | null) => void;
// Endpoint for retrieving a specific user
router.get('/:userId', (req, res): void => {
  const { userId } = req.params;

  const getUser = async (userId: string, callback: Callback<any>): Promise<void> => {
    try {
      const user = await sql`
        SELECT * FROM backend_schema.user
        WHERE uid = ${userId}
            AND EXISTS (
            SELECT 1 FROM backend_schema.user WHERE uid = ${userId}
            )
    `;
        // Select 1 ensures that the backend_schema.user has at least 1 column
      callback(null, user);
    } catch (error) {
      callback(error as Error, null);
    }
  };

  const user = getUser(userId, (error, user) => {
    if (error != null) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('User:', user);
      res.status(200).json(user[0]);
      return user;
    }
  });
});

module.exports = router;
