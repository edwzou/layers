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
      const result = outfit.rows;

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

  const client = pool.connect();

  // Query outfits for the specified user
  const getAllOutfits = async (userId: string): Promise<any> => {
    try {
      const run = pool.query(
        "SELECT * FROM backend_schema.outfit WHERE uid = $1",
        [userId]
      );
      await getUserCore(userId, await client);
      const result = await run;
      const outfits = result.rows;

      responseCallbackGetAll(outfits, res, "Outfits");
    } catch (error) {
      responseCallbackGet(error, null, res);
    } finally {
      (await client).release();
    }
  };

  void getAllOutfits(userId);
});

module.exports = router;
