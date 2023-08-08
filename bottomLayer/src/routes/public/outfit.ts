import { responseCallback } from '../../utils/responseCallback';
import { sql } from '../../utils/sqlImport';
import express from 'express';
const router = express.Router();

// Endpoint for retrieving a specific outfit
router.get('/:outfitId', (req: any, res: any): void => {
  const { outfitId } = req.params;

  const getOutfitById = async (): Promise<any> => {
    try {
      const outfit = await sql`
              SELECT * FROM backend_schema.outfit
              WHERE oid = ${outfitId}
                AND EXISTS (
                  SELECT 1 FROM backend_schema.user WHERE oid = ${outfitId}
              )
          `;

      const result = responseCallback(null, outfit);

      res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  void getOutfitById();
});

// Endpoint for retrieving all outfits
router.get('/u/:userId', (req: any, res: any): void => {
  const { userId } = req.params;

  // Query outfits for the specified user
  const getAllOutfits = async (): Promise<any> => {
    try {
      const outfits = await sql`
        SELECT * FROM backend_schema.outfit
        WHERE uid = ${userId}
          `;

      const result = responseCallback(null, outfits);

      res.status(200).json({ message: 'Success', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  void getAllOutfits();
});

module.exports = router;
