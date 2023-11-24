import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import {
  getAllClothing,
  getAllClothingCate,
  getClothingById
} from '../helper/clothingItem';
const router = express.Router();

// Endpoint for retrieving a specific clothing item
router.get('/:itemId', (req: Request, res: Response): void => {
  const { itemId } = req.params;
  const query = `
        SELECT *, to_json(color) AS color FROM backend_schema.clothing_item WHERE ciid = ${itemId}`;
  void getClothingById(query, res);
});

// Endpoint for retrieving all clothing items
router.get('/u/:uid', (req: Request, res: Response): void => {
  const { uid } = req.params;
  const { parse } = req.query;

  const query = `SELECT *, to_json(color) AS color FROM backend_schema.clothing_item WHERE uid = '${uid}'`;
  const client = pool.connect();

  if (parse === 'categories') {
    void getAllClothingCate(query, res, client, uid);
  } else {
    void getAllClothing(query, res, client, uid);
  }
});

export { router as default, router as clothingRoute };
