import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import { getUserCore, responseCallbackGet, responseCallbackGetAll } from '../../utils/responseCallback';
const router = express.Router();

// Endpoint for retrieving a specific clothing item
router.get('/:itemId', (req: Request, res: Response): void => {
  const { itemId } = req.params;

  const getClothingById = async (itemId: string): Promise<any> => {
    try {
      const item = await pool.query('SELECT * FROM backend_schema.clothing_item WHERE ciid = $1', [itemId]);
      const result = item.rows;

      responseCallbackGet(null, result, res, 'Clothing Item');
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  void getClothingById(itemId);
});

// Endpoint for retrieving a all clothing items
router.get('/u/:userId', (req: Request, res: Response): void => {
  const { userId } = req.params;

  const getAllClothing = async (userId: string): Promise<any> => {
    try {
      const result = await pool.query('SELECT * FROM backend_schema.clothing_item WHERE uid = $1', [userId]);
      const items = result.rows;
      await run;
      responseCallbackGetAll(items, res, 'Clothing Items');
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  void getAllClothing(userId);
});

module.exports = router;
