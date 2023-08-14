import { getOutfitCore, getUserCore, responseCallback, responseCallbackDelete, responseCallbackPost, responseCallbackUpdate } from '../../utils/responseCallback';
import { sql } from '../../utils/sqlImport';
import express from 'express';
const router = express.Router();

// Endpoint for creating a new outfit
router.post('/', (req: any, res: any): void => {
    const { title, clothing_items, uid } = req.body;
    const insertOutfit = async (): Promise<any> => {
      try {
        await sql`INSERT INTO backend_schema.outfit (title, clothing_items, uid)
          VALUES (${title}, ${clothing_items}, ${uid})
        `;

        responseCallbackPost(null, res, 'Outfit');
      } catch (error) {
        responseCallbackPost(error, res)
      }

    };

  void insertOutfit();
});

// Endpoint for deleting a specific outfit
router.delete('/:outfitId', (req: any, res: any): void => {
  const { outfitId } = req.params;
  const deleteOutfit = async (outfitId: string): Promise<void> => {
    try {
      await getOutfitCore(outfitId);
      await sql`DELETE FROM backend_schema.outfit WHERE oid = ${outfitId}`;
  
      responseCallbackDelete(null, outfitId, res, 'Outift')
    } catch (error) {
      responseCallbackDelete(error, outfitId, res)
    }

  };

  void deleteOutfit(outfitId);
});

// Endpoint for updating a specific outfit
router.put('/:oid', (req: any, res: any): void => {
    // Extract outfit data from the request body
    const { oid } = req.params;
    const { title, clothing_items } = req.body;

    const updateOutfit = async (oid: string): Promise<void> => {
      // Update the outfit in the database
      try {
        const run = getOutfitCore(oid);
        await sql`
          UPDATE backend_schema.outfit
          SET title = ${title}, clothing_items = ${clothing_items}
          WHERE oid = ${oid}
        `;
        await run;
        // responds with successful update even when no changes are made
        responseCallbackUpdate(null, oid, res, "Outfit");
      } catch (error) {
        responseCallbackUpdate(error, oid, res)
      }
  
    };

    void updateOutfit(oid);
});

module.exports = router;
