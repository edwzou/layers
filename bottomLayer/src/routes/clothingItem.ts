import express from 'express';
import { sql } from '../utils/sql-import';
const router = express.Router();

// Endpoint for creating a new clothing item
router.post('/', (req: any, res: any): void => {
  try {
    // Extract clothing item details from the request body
    const { image, category, title, uid, brands, size, color } = req.body;
    // Insert the clothing item into the database

    const insertClothing = async (): Promise<any> => {
      await sql`
            INSERT INTO backend_schema.clothing_item (image, category, title, uid, brands, size, color)
            VALUES ( ${image}, ${category}, ${title}, ${uid}, ${brands}, ${size}, ${color})
          `;
    };

    void insertClothing();

    res.status(200).json({ message: 'Clothing item created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for updating a specific outfit
router.put('/:itemId', (req: any, res: any): void => {
  try {
    // Extract outfit data from the request body
    const { image, category, title, brands, size, color } = req.body;
    const { itemId } = req.params;

    const updateClothing = async (): Promise<any> => {
      // Update the outfit in the database
      await sql`
            UPDATE backend_schema.clothing_item
            SET title = ${title}, image = ${image}, category = ${category}, brands = ${brands}, size = ${size}, color = ${color}
            WHERE ciid = ${itemId}
          `;
    };

    void updateClothing();

    // Return the updated outfit
    res.status(200).json({ message: 'Clothing Item updated successfully', itemId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the clothing item.' });
  }
});

// Endpoint for deleting a specific clothing item
router.delete('/:itemId', (req: any, res: any) => {
  try {
    const { itemId } = req.params;

    const deleteClothing = async (): Promise<any> => {
      await sql`DELETE FROM backend_schema.clothing_item WHERE ciid = ${itemId}`;
    };

    void deleteClothing();

    res.status(200).json({ message: 'Clothing item deleted successfully', itemId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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
