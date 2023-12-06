import {
  responseCallbackDelete,
  responseCallbackGet,
  responseCallbackGetAll,
  responseCallbackPost,
  responseCallbackUpdate
} from '../../utils/responseCallback';
import { pool } from '../../utils/sqlImport';
import express, { type Request, type Response } from 'express';
import {
  getAllOutfits,
  getAllOutfitsCate,
  getOutfitById,
  getOutfitByIdCate,
  outfitCateQuery
} from '../helper/outfit';

const router = express.Router();

// Endpoint for creating a new outfit
router.post('/', (req: Request, res: Response): void => {
  const uid = req.user as string;
  const { title, clothing_items } = req.body;

  const insertOutfit = async (): Promise<any> => {
    try {
      await pool.query(
        'INSERT INTO backend_schema.outfit (title, clothing_items, uid) VALUES ($1, $2, $3)',
        [title, clothing_items, uid]
      );

      responseCallbackPost(null, res, 'Outfit');
    } catch (error) {
      responseCallbackPost(error, res);
    }
  };

  void insertOutfit();
});

// Endpoint for deleting a specific outfit
router.delete('/:outfitId', (req: Request, res: Response): void => {
  const uid = req.user as string;
  const { outfitId } = req.params;
  const deleteOutfit = async (outfitId: string): Promise<void> => {
    try {
      const deleteOutfit = await pool.query(
        'DELETE FROM backend_schema.outfit WHERE oid = $1 AND uid = $2',
        [outfitId, uid]
      );
      responseCallbackDelete(
        null,
        outfitId,
        res,
        'Outfit',
        deleteOutfit.rowCount
      );
    } catch (error) {
      responseCallbackDelete(error, outfitId, res, 'Outfit');
    }
  };

  void deleteOutfit(outfitId);
});

// Endpoint for updating a specific outfit
router.put('/:oid', (req: Request, res: Response): void => {
  const uid = req.user as string;
  const { oid } = req.params;
  // Extract outfit data from the request body
  const { title, clothing_items } = req.body;

  const updateOutfit = async (oid: string): Promise<void> => {
    // Initialize query parts
    let query = 'UPDATE backend_schema.outfit SET ';
    let queryParams = [];
    let paramCounter = 1;

    // Append title to the query if provided
    if (title !== undefined) {
      query += `title = $${paramCounter}`;
      queryParams.push(title);
      paramCounter++;
    }

    // Append clothing_items to the query if provided
    if (clothing_items !== undefined) {
      if (queryParams.length > 0) query += ', ';
      query += `clothing_items = $${paramCounter}`;
      queryParams.push(clothing_items);
      paramCounter++;
    }

    // Finalize the query
    query += ` WHERE oid = $${paramCounter} AND uid = $${paramCounter + 1}`;
    queryParams.push(oid, uid);

    // Update the outfit in the database
    try {
      const updateOutfit = await pool.query(query, queryParams);

      // responds with successful update even when no changes are made
      responseCallbackUpdate(null, oid, res, 'Outfit', updateOutfit.rowCount);
    } catch (error) {
      responseCallbackUpdate(error, oid, res, 'Outfit');
    }
  };

  void updateOutfit(oid);
});

// Endpoint for retrieving the logged in users outfit
router.get('/:outfitId', (req: Request, res: Response): void => {
  const uid = req.user as string;
  const { outfitId } = req.params;
  const { parse } = req.query;

  if (parse === 'categories') {
    const queryAdvanced = outfitCateQuery(outfitId, uid);
    void getOutfitByIdCate(queryAdvanced, res);
  } else {
    const queryBasic = `SELECT * FROM backend_schema.outfit WHERE oid = '${outfitId}' and uid = '${uid}'`;
    void getOutfitById(queryBasic, res);
  }
});

// Endpoint for retrieving all of the logged in user's outfits
router.get('/', (req: Request, res: Response): void => {
  const uid = req.user as string;
  const { parse } = req.query;

  if (parse === 'categories') {
    const queryAdvanced = outfitCateQuery('', uid);
    void getAllOutfitsCate(queryAdvanced, res);
  } else {
    const queryBasic = `SELECT * FROM backend_schema.outfit WHERE uid = '${uid}'`;
    void getAllOutfits(queryBasic, res);
  }
});

export { router as default, router as privateOutfitRoute };
