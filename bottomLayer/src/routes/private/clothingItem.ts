import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import { responseCallbackDelete, responseCallbackPost, responseCallbackUpdate } from '../../utils/responseCallback';
import { checkAuthenticated } from '../../middleware/auth';
import axios from 'axios';
import { downloadURLFromS3 } from '../../s3/download-url-from-s3';
import { uploadURIToS3 } from '../../s3/upload-uri-to-s3';
const router = express.Router();

// Endpoint for creating a specific clothing item
router.post('/', checkAuthenticated, (req: Request, res: Response): void => {
  const uid = req.user;
  const { image, category, title, brands, size, color } = req.body;
  
  const insertClothingItem = async (): Promise<any> => {
    try {
      const response = await axios.get(image, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary');
      await uploadURIToS3(imageBuffer, title); // uploading URI to S3
      const URL = await downloadURLFromS3(title); // downloading URL from S3
      await pool.query(`INSERT INTO backend_schema.clothing_item (image, category, title, brands, size, color, uid)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`, [URL, category, title, brands, size, color, uid]);

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
      responseCallbackDelete(null, ciid, res, 'Clothing Item', deleteItem.rowCount);
    } catch (error) {
      responseCallbackDelete(error, ciid, res, 'Clothing Item');
    }
  };

  void deleteItem(ciid);
});

// Endpoint for updating a specific outfit
router.put('/:ciid', checkAuthenticated, (req: any, res: any): void => {
  const { ciid } = req.params;
  const { image, category, title, brands, size, color } = req.body;

  const updateItem = async (ciid: string): Promise<void> => {
    try {
      const response = await axios.get(image, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary');
      await uploadURIToS3(imageBuffer, title); // uploading URI to S3
      const URL = await downloadURLFromS3(title); // downloading URL from S3
      const updateItem = await pool.query(`
      UPDATE backend_schema.clothing_item
      SET image = $1,
          category = $2,
          title = $3,
          brands = $4,
          size = $5,
          color = $6
      WHERE ciid = $7
      `, [URL, category, title, brands, size, color, ciid]);
      responseCallbackUpdate(null, ciid, res, "Clothing Item", updateItem.rowCount);
    } catch (error) {
      responseCallbackUpdate(error, ciid, res, 'Clothing Item')
    }
  };

  void updateItem(ciid);
});

module.exports = router;
