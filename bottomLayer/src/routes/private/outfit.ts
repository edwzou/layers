import { NotFoundError } from '../../utils/Errors/NotFoundError';
import { responseCallbackDelete, responseCallbackPost, responseCallbackUpdate } from '../../utils/responseCallback';
import { pool } from '../../utils/sqlImport';
import express, { type Request, type Response } from 'express';
const router = express.Router();

// Endpoint for creating a new outfit
router.post('/', (req: Request, res: Response): void => {
  const { title, clothing_items, uid } = req.body;
  const insertOutfit = async (): Promise<any> => {
    try {
      await pool.query('INSERT INTO backend_schema.outfit (title, clothing_items, uid) VALUES ($1, $2, $3)', [title, clothing_items, uid]);

      responseCallbackPost(null, res, 'Outfit');
    } catch (error) {
      responseCallbackPost(error, res);
    }
  };

  void insertOutfit();
});

// Endpoint for deleting a specific outfit
router.delete('/:outfitId', (req: Request, res: Response): void => {
  const { outfitId } = req.params;
  const deleteOutfit = async (outfitId: string): Promise<void> => {
    try {
      const deleteOutfit = await pool.query('DELETE FROM backend_schema.outfit WHERE oid = $1', [outfitId]);
      responseCallbackDelete(
        null,
        outfitId,
        res,
        "Outift",
        deleteOutfit.rowCount
      );
    } catch (error) {
      responseCallbackDelete(error, outfitId, res, 'Outfit')
    }
  };

  void deleteOutfit(outfitId);
});

// Endpoint for updating a specific outfit
router.put('/:oid', (req: Request, res: Response): void => {
  // Extract outfit data from the request body
  const { oid } = req.params;
  const { title, clothing_items } = req.body;

    const updateOutfit = async (oid: string): Promise<void> => {
      // Update the outfit in the database
      try {
        const updateOutfit = await pool.query('UPDATE backend_schema.outfit SET title = $1, clothing_items = $2 WHERE oid = $3', [title, clothing_items, oid]);

        // responds with successful update even when no changes are made
        responseCallbackUpdate(null, oid, res, "Outfit", updateOutfit.rowCount);
      } catch (error) {
        responseCallbackUpdate(error, oid, res, 'Outfit')
      }
  
    };

  void updateOutfit(oid);
});

module.exports = router;
