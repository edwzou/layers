import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import { getUserCore, responseCallbackGet, responseCallbackGetAll } from '../../utils/responseCallback';

const router = express.Router();

// Endpoint for retrieving a specific outfit
router.get('/:outfitId', (req: Request, res: Response): void => {
  const { outfitId } = req.params;

  const getOutfitById = async (outfitId: string): Promise<any> => {
    try {
      const outfit = await pool.query('SELECT * FROM backend_schema.outfit WHERE oid = $1', [outfitId]);
      const result = outfit.rows[0];

      responseCallbackGet(null, result, res, 'Outfits');
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  void getOutfitById(outfitId);
});

// Endpoint for retrieving all outfits
router.get('/u/:userId', (req: Request, res: Response): void => {
  const { userId } = req.params;

  // Query outfits for the specified user
  const getAllOutfits = async (userId: string): Promise<any> => {
    try {
      const run = getUserCore(userId);
      const result = await pool.query('SELECT * FROM backend_schema.outfit WHERE uid = $1', [userId]);
      const outfits = result.rows;
      await run;
      responseCallbackGetAll(outfits, res, "Outfits");
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  void getAllOutfits(userId);
});

module.exports = router;
