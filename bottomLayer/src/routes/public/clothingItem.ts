import express from 'express';
import { sql } from '../../utils/sql-import';
const router = express.Router();

// Endpoint for retrieving a specific clothing item
router.get('/:itemId', (req: any, res: any): void => {
  try {
    const { itemId } = req.params;

    const getClothingById = async (): Promise<any> => {
      // Query the database to retrieve the clothing item
      const item = await sql`
            SELECT * FROM backend_schema.clothing_item
            WHERE ciid = ${itemId}   
              AND EXISTS (
                  SELECT 1 FROM backend_schema.user WHERE ciid = ${itemId}
          )
          `;

      return item;
    };

    // !!! Await Promise
    const item: any = getClothingById();

    // Return the item
    res.status(200).json(item[0]);
  } catch (error) {
    console.error('Error retrieving clothing item:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the clothing item' });
  }
});

// Endpoint for retrieving a all clothing items
router.get('/u/:user_id', (req: any, res: any): void => {
  try {
    const { userId } = req.params;

    const getAllClothing = async (): Promise<any> => {
      const items = await sql`
            SELECT * FROM backend_schema.clothing_item
            WHERE uid = ${userId}
          `;
      return items;
    };

    // !!! Await Promise
    const items = getAllClothing();

    // Return the items
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
