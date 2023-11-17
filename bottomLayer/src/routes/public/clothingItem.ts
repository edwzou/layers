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
import { itemCategories } from '../../utils/constants/itemCategories';
import { NotFoundError } from '../../utils/Errors/NotFoundError';
const router = express.Router();

// Endpoint for retrieving a specific clothing item
router.get('/:itemId', (req: Request, res: Response): void => {
  const { itemId } = req.params;

  const getClothingById = async (itemId: string): Promise<any> => {
    try {
      const query = pool.query(
        'SELECT *, to_json(color) AS color FROM backend_schema.clothing_item WHERE ciid = $1',
        [itemId]
      );

      const item = await query;
      const temp = item.rows;

      if (temp.length === 0) {
        return responseCallbackGet(null, temp, res, 'Clothing Item');
      }
      const result = temp[0];
      const imgRef = result.image_url;
      result.image_url = await downloadURLFromS3(imgRef);

      responseCallbackGet(null, result, res, 'Clothing Item');
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  void getClothingById(itemId);
});

// Endpoint for retrieving all clothing items
router.get('/u/:uid', (req: Request, res: Response): void => {
  const { uid } = req.params;
  const { parse } = req.query;

  const client = pool.connect();

  const getAllClothing = async (uid: string): Promise<any> => {
    try {
      const run = pool.query(
        'SELECT *, to_json(color) AS color FROM backend_schema.clothing_item WHERE uid = $1',
        [uid]
      );
      await getUserCore(uid, await client);
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
  const getAllClothingCate = async (uid: string): Promise<any> => {
    try {
      const run = pool.query(
        'SELECT *, to_json(color) AS color FROM backend_schema.clothing_item WHERE uid = $1',
        [uid]
      );
      await getUserCore(uid, await client);
      const result = await run;
      const items = result.rows;
      const asyncManager = new AsyncManager(items.length);
      const asyncTrigger = once(asyncManager, 'proceed');
      for (const item of items) {
        void urlDownloadHandler(item.image_url, item, asyncManager);
      }
      const categories: Record<string, any> = {};
      Object.values(itemCategories).forEach((value) => {
        categories[value] = [];
      });
      const resolution = await asyncTrigger;
      if (resolution[1] < 0) {
        throw new Error('Some Url Download Requests Failed');
      }
      for (const item of items) {
        categories[item.category].push(item);
      }
      responseCallbackGetAll(categories, res, 'Clothing Items');
    } catch (error) {
      responseCallbackGet(error, null, res);
    } finally {
      (await client).release();
    }
  };

  if (parse === 'categories') {
    void getAllClothingCate(uid);
  } else {
    void getAllClothing(uid);
  }
});

export { router as default, router as clothingRoute };
