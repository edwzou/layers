import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import {
  responseCallbackDelete,
  // responseCallbackGet,
  // responseCallbackGetAll,
  responseCallbackPost,
  responseCallbackUpdate
} from '../../utils/responseCallback';
import { convertImage } from '../../s3/convert-image';
import { deleteObjectFromS3 } from '../../s3/delete-object-from-s3';
import { v4 as uuidv4 } from 'uuid';
import {
  getClothingById,
  getAllClothing,
  getAllClothingCate
} from '../helper/clothingItem';
const router = express.Router();

// Endpoint for creating a specific clothing item
router.post('/', (req: Request, res: Response): void => {
  const uid = req.user as string;
  const { image, category, title, brands, size, color } = req.body;
  const insertClothingItem = async (): Promise<any> => {
    try {
      const ciid = uuidv4();
      const imgRef = await convertImage(image, ciid, false);
      await pool.query(
        `INSERT INTO backend_schema.clothing_item (ciid, image_url, category, title, brands, size, color, uid)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [ciid, imgRef, category, title, brands, size, color, uid]
      );

      responseCallbackPost(null, res, 'Clothing Item: ' + ciid);
    } catch (error) {
      responseCallbackPost(error, res);
    }
  };
  void insertClothingItem();
});

// Endpoint for deleting a specific clothing_item
router.delete('/:ciid', (req: Request, res: Response): void => {
  const uid = req.user as string;
  const { ciid } = req.params;
  const deleteItem = async (ciid: string): Promise<void> => {
    const client = pool.connect();
    try {
      const async1 = deleteObjectFromS3(ciid);
      // const cli = await client;
      const async2 = pool.query(
        'DELETE FROM backend_schema.clothing_item WHERE ciid = $1 AND uid = $2',
        [ciid, uid]
      );
      // const async3 = cli.query(
      //   `UPDATE backend_schema.outfit SET clothing_items = array_remove(clothing_items, '${ciid}')`
      // );

      // const removeFromOutfit = await async3;
      const deleteItem = await async2;
      await async1;

      responseCallbackDelete(
        null,
        ciid,
        res,
        'Clothing Item',
        deleteItem.rowCount
      );
    } catch (error) {
      responseCallbackDelete(error, ciid, res, 'Clothing Item');
    } finally {
      (await client).release();
    }
  };
  void deleteItem(ciid);
});

// Endpoint for updating a specific clothing_item
router.put('/:ciid', (req: any, res: any): void => {
  const uid = req.user as string;
  const { ciid } = req.params;
  const { category, title, size, color } = req.body;

  const updateItem = async (ciid: string): Promise<void> => {
    try {
      let query = 'UPDATE backend_schema.clothing_item SET ';
      const fieldsToUpdate = [];
      const values = [];

      if (category !== undefined) {
        fieldsToUpdate.push(`category = $${values.length + 1}`);
        values.push(category);
      }
      if (title !== undefined) {
        fieldsToUpdate.push(`title = $${values.length + 1}`);
        values.push(title);
      }
      if (size !== undefined) {
        fieldsToUpdate.push(`size = $${values.length + 1}`);
        values.push(size);
      }
      if (color !== undefined) {
        fieldsToUpdate.push(`color = $${values.length + 1}`);
        values.push(color); // Assuming color is already an array of strings
      }

      // Check if at least one field is provided
      if (fieldsToUpdate.length === 0) {
        return res.status(400).send({ error: 'No valid fields provided for update.' });
      }

      query += fieldsToUpdate.join(', ') + ` WHERE ciid = $${values.length + 1} AND uid = $${values.length + 2}`;
      values.push(ciid, uid);

      // Execute the update query
      const updateResult = await pool.query(query, values);
      responseCallbackUpdate(
        null,
        ciid,
        res,
        'Clothing Item',
        updateResult.rowCount
      );
    } catch (error) {
      responseCallbackUpdate(error, ciid, res, 'Clothing Item');
    }
  };

  void updateItem(ciid);
});

// Endpoint for retrieving the logged in users clothing item
router.get('/:itemId', (req: Request, res: Response): void => {
  const uid = req.user as string;
  const { itemId } = req.params;

  const query = `
        SELECT *, to_json(color) AS color FROM backend_schema.clothing_item WHERE ciid = '${itemId}' AND uid = '${uid}'`;
  void getClothingById(query, res);
});

// Endpoint for retrieving all a logged in users clothing items
router.get('/', (req: Request, res: Response): void => {
  const uid = req.user as string;
  const { parse } = req.query;
  const query = `SELECT *, to_json(color) AS color FROM backend_schema.clothing_item WHERE uid = '${uid}'`;

  if (parse === 'categories') {
    void getAllClothingCate(query, res);
  } else {
    void getAllClothing(query, res);
  }
});

export { router as default, router as privateClothingRoute };
