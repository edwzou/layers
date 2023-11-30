import express, { type Request, type Response } from 'express';
import { userSearch } from '../helper/search';

const router = express.Router();

router.get('/:username', (req: Request, res: Response): void => {
  const username = req.params.username;
  const query = `Select * FROM backend_schema.user Where username ~* '${username}.*'
ORDER BY LENGTH(username);`;

  void userSearch(query, res);
});

export { router as default, router as searchRoute };
