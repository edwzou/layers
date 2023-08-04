import { sql } from '../utils/sql-import';
import express from 'express';
const router = express.Router();

router.post('/', (req: any, res: any): void => {
  try {
    const { title, clothing_items, uid } = req.body;
    const insertOutfit = async (): Promise<any> => {
      await sql`INSERT INTO backend_schema.outfit (title, clothing_items, uid)
            VALUES (${title}, ${clothing_items}, ${uid})
            `;
    };

    void insertOutfit();
    // Return the created outfit
    res.status(200).json({ message: 'Outfit created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for deleting a specific outfit
router.delete('/:outfitId', (req: any, res: any): void => {
  try {
    const { outfitId } = req.params;
    const deleteOutfit = async (): Promise<void> => {
      await sql`DELETE FROM backend_schema.outfit WHERE oid = ${outfitId}`;
    };

    void deleteOutfit();

    res.status(200).json({ message: 'Outfit deleted successfully', outfitId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for updating a specific outfit
router.put('/:oid', (req: any, res: any): void => {
  try {
    // Extract outfit data from the request body
    const { title, clothing_items } = req.body;
    const { oid } = req.params;

    const updateOutfit = async (): Promise<void> => {
      // Update the outfit in the database
      await sql`
            UPDATE backend_schema.outfit
            SET title = ${title}, clothing_items = ${clothing_items}
            WHERE oid = ${oid}
          `;
    };

    void updateOutfit();

    // Return the updated outfit
    res.status(200).json({ message: 'Outfit updated successfully', oid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the outfit.' });
  }
});

// Endpoint for retrieving a specific outfit
router.get('/:outfitId', (req: any, res: any): void => {
  try {
    const { outfitId } = req.params;

    const getOutfitById = async (): Promise<any> => {
      const outfit = await sql`
              SELECT * FROM backend_schema.outfit
              WHERE oid = ${outfitId}
                AND EXISTS (
                  SELECT 1 FROM backend_schema.user WHERE oid = ${outfitId}
              )
          `;

      return outfit;
    };

    // !!! Await Promise
    const outfit: any = getOutfitById();
    // Return the user information
    res.status(200).json(outfit[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for retrieving all outfits
router.get('/u/:userId', (req: any, res: any): void => {
  try {
    const { userId } = req.params;
    // Query outfits for the specified user

    const getAllOutfits = async (): Promise<any> => {
      const outfits = await sql`
        SELECT * FROM backend_schema.outfit
        WHERE uid = ${userId}
          `;

      return outfits;
    };

    // !!! Await response
    const outfits = getAllOutfits().then();
    console.log(outfits);

    res.status(200).json(outfits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
