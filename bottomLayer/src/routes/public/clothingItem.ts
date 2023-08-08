import express from 'express';
import { sql } from '../../utils/sqlImport';
import { responseCallback } from '../../utils/responseCallback';
const router = express.Router();

// Endpoint for retrieving a specific clothing item
router.get('/:itemId', (req: any, res: any): void => {
  const { itemId } = req.params;

  const getClothingById = async (): Promise<any> => {
    try {
      const item = await sql`
        SELECT * FROM backend_schema.clothing_item
        WHERE ciid = ${itemId}   
          AND EXISTS (
              SELECT 1 FROM backend_schema.user WHERE ciid = ${itemId}
      )`;

      const result = responseCallback(null, item);

      res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  void getClothingById();
});

// Endpoint for retrieving a all clothing items
router.get('/u/:userId', (req: any, res: any): void => {
  const { userId } = req.params;

  const getAllClothing = async (): Promise<any> => {
    try {
      const items = await sql`
              SELECT * FROM backend_schema.clothing_item
              WHERE uid = ${userId}
            `;

      const result = responseCallback(null, items);

      res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  void getAllClothing();
});

module.exports = router;
