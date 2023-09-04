import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import { responseCallbackDelete, responseCallbackPost, responseCallbackUpdate } from '../../utils/responseCallback';
import { checkAuthenticated } from '../../middleware/auth';
const router = express.Router();

// Endpoint for creating a specific clothing item
router.post('/', checkAuthenticated, (req: Request, res: Response): void => {
  const { image, category, title, brands, size, color } = req.body;
  const uid = req.user;

  const insertClothingItem = async (): Promise<any> => {
    try {
      await pool.query(`INSERT INTO backend_schema.clothing_item (image, category, title, brands, size, color, uid)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`, [image, category, title, brands, size, color, uid]);

      responseCallbackPost(null, res, 'Clothing Item');
    } catch (error) {
      responseCallbackPost(error, res);
    }
  };
  void insertClothingItem();
});

// Endpoint for deleting a specific outfit
router.delete('/:ciid', checkAuthenticated, (req: Request, res: Response): void => {
  const { ciid } = req.params;
  const deleteItem = async (ciid: string): Promise<void> => {
    try {
      const deleteItem = await pool.query('DELETE FROM backend_schema.clothing_item WHERE ciid = $1', [ciid]);

      responseCallbackDelete(
        null,
        ciid,
        res,
        'Clothing Item',
        deleteItem.rowCount
      );
    } catch (error) {
      responseCallbackDelete(error, ciid, res, 'Clothing Item');
    }
  };
  void deleteItem(ciid);
});

// Endpoint for updating a specific outfit
router.put('/:ciid', checkAuthenticated, (req: any, res: any): void => {
  // Extract outfit data from the request body
  const { ciid } = req.params;
  const { image, category, title, brands, size, color } = req.body;

    const updateItem = async (ciid: string): Promise<void> => {
      // Update the outfit in the database
      try {
        const updateItem = await pool.query(`
        UPDATE backend_schema.clothing_item
        SET image = $1,
            category = $2,
            title = $3,
            brands = $4,
            size = $5,
            color = $6
        WHERE ciid = $7
        `, [image, category, title, brands, size, color, ciid]);
        // responds with successful update even when no changes are made
        responseCallbackUpdate(null, ciid, res, "Clothing Item", updateItem.rowCount);
      } catch (error) {
        responseCallbackUpdate(error, ciid, res, 'Clothing Item')
      }
  
    };

  void updateItem(ciid);
});

module.exports = router;
