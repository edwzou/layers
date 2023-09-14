import express, { type Request, type Response } from 'express';
import { checkAuthenticated } from '../../middleware/auth';
const router = express.Router();

// Endpoint for searching users by username or name
router.get(
  '/users',
  checkAuthenticated,
  (req: Request, res: Response): void => {
    try {
      // const { query } = req.query;
      // Perform user search logic

      res.json({ message: 'User search results' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export { router as default, router as privateSearchRoute };
