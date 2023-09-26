import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import {
  getUserCore,
  responseCallbackGet,
  responseCallbackGetAll
} from '../../utils/responseCallback';
import { downloadURLFromS3 } from '../../s3/download-url-from-s3';
import { AsyncManager } from '../../utils/event-emitters/asyncManager';
import { urlDownloadHandler } from '../../utils/event-emitters/asyncHandlers';
import { once } from 'node:events';
const router = express.Router();

// Endpoint for retrieving a specific clothing item
router.get('/:itemId', (req: Request, res: Response): void => {
  const { itemId } = req.params;

  const getClothingById = async (itemId: string): Promise<any> => {
    try {
      const item = await pool.query(
        'SELECT * FROM backend_schema.clothing_item WHERE ciid = $1',
        [itemId]
      );
      const result = item.rows[0];
      console.log(result);
      const imgRef = result.image_url;
      result.image_url = await downloadURLFromS3(imgRef);
      console.log(result);

      responseCallbackGet(null, result, res, 'Clothing Item');
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  void getClothingById(itemId);
});

// Endpoint for retrieving all clothing items
router.get('/u/:userId', (req: Request, res: Response): void => {
  const { userId } = req.params;

  const client = pool.connect();

  const getAllClothing = async (userId: string): Promise<any> => {
    try {
      const run = pool.query(
        'SELECT * FROM backend_schema.clothing_item WHERE uid = $1',
        [userId]
      );
      await getUserCore(userId, await client);
      const result = await run;
      const items = result.rows;
      const asyncManager = new AsyncManager(items.length);
      const asyncTrigger = once(asyncManager, 'proceed');
      for (const item of items) {
        void urlDownloadHandler(item.image_url, item, asyncManager);
      }

      const resolution = await asyncTrigger;
      if (resolution[1] < 0) {
        throw new Error('Some Url Download Requests Failed');
      }
      responseCallbackGetAll(items, res, 'Clothing Items');
    } catch (error) {
      responseCallbackGet(error, null, res);
    } finally {
      (await client).release();
    }
  };

  void getAllClothing(userId);
});

export { router as default, router as clothingRoute };
