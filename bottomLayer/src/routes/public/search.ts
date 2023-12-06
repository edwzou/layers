import express, { type Request, type Response } from 'express';
import { userSearch } from '../helper/search';

const router = express.Router();

router.get('/:username', (req: Request, res: Response): void => {
  const username = req.params.username;
  // the '~*' in the query below makes it case insensitvie to change it to case sensitive remove the '*'
  let query = `Select * FROM backend_schema.user Where username ~* '${username}.*'`;
  query += ' ORDER BY LENGTH(username);';

  void userSearch(query, res);
});

export { router as default, router as searchRoute };
