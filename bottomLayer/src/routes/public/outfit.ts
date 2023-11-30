import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import {
  getAllOutfits,
  getAllOutfitsCate,
  getOutfitById,
  getOutfitByIdCate,
  outfitCateQuery
} from '../helper/outfit';

const router = express.Router();

// Endpoint for retrieving a specific outfit
router.get('/:outfitId', (req: Request, res: Response): void => {
  const outfitId = req.params.outfitId;
  const { parse } = req.query;

  if (parse === 'categories') {
    const queryAdvanced = outfitCateQuery(outfitId);
    void getOutfitByIdCate(queryAdvanced, res);
  } else {
    const queryBasic = `SELECT * FROM backend_schema.outfit WHERE oid = '${outfitId}'`;
    void getOutfitById(queryBasic, res);
  }
});

// Endpoint for retrieving all outfits
router.get('/u/:uid', (req: Request, res: Response): void => {
  const { uid } = req.params;
  const { parse } = req.query;

  const client = pool.connect();

  if (parse === 'categories') {
    const queryAdvanced = outfitCateQuery('', uid);
    void getAllOutfitsCate(queryAdvanced, res, client, uid);
  } else {
    const queryBasic = `SELECT * FROM backend_schema.outfit WHERE uid = '${uid}'`;
    void getAllOutfits(queryBasic, res, client, uid);
  }
});

export { router as default, router as outfitRoute };
