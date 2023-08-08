import express, { type Request, type Response } from 'express';
import { sql } from '../../utils/sqlImport';
import { responseCallback } from '../../utils/responseCallback';
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();

router.post('/', requiresAuth(), (req: Request, res: Response): void => {
  try {
    const { image, category, title, brands, size, color, uid } = req.body;
    const insertClothingItem = async (): Promise<any> => {
      await sql`INSERT INTO backend_schema.clothing_item (image, category, title, brands, size, color, uid)
            VALUES (${image}, ${category},${title}, ${brands}, ${size}, ${color}, ${uid})
            `;
    };

    void insertClothingItem();

    // Return the created outfit
    res.status(200).json({ message: 'Clothing item created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for retrieving a specific clothing item
router.get('/:itemId', requiresAuth(), (req: any, res: any): void => {
  const { itemId } = req.params;
  const getItem = async (): Promise<void> => {
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

  void getItem();
});

// Endpoint for retrieving a all clothing items
router.get('/u/:userId', requiresAuth(), (req: any, res: any): void => {
  const { userId } = req.params;

  const getAllItems = async (): Promise<void> => {
    try {
      console.log(userId);
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

  void getAllItems();
});

module.exports = router;
