import { sql } from '../../utils/sql-import';
import express from 'express';
const router = express.Router();

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
