import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import {
  getUserCore,
  responseCallbackGet,
  responseCallbackGetAll
} from '../../utils/responseCallback';
import { itemCategories } from '../../utils/constants/itemCategories';
import { itemFields } from '../../utils/constants/itemFields';
import { outfitFields } from '../../utils/constants/outfitFields';
import { urlDownloadHandlerOutfits } from '../../utils/event-emitters/asyncHandlers';
import { AsyncManager } from '../../utils/event-emitters/asyncManager';
import { once } from 'node:events';

const router = express.Router();

// Endpoint for retrieving a specific outfit
router.get('/:outfitId', (req: Request, res: Response): void => {
  const outfitId = req.params.outfitId;
  const { parse } = req.query;

  const getOutfitById = async (outfitId: string): Promise<any> => {
    try {
      const outfit = pool.query(
        'SELECT * FROM backend_schema.outfit WHERE oid = $1',
        [outfitId]
      );

      const temp = await outfit;
      const result = temp.rows;

      responseCallbackGet(null, result, res, 'Outfits');
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  const getOutfitByIdCate = async (outfitId: string): Promise<any> => {
    let itemPrefix = '';
    for (const itemField of Object.values(itemFields)) {
      if (itemField === 'color') {
        itemPrefix +=
          ' to_json(' + itemField + ')' + ' AS ' + 'item_' + itemField + ',';
        continue;
      }
      itemPrefix += ' ' + itemField + ' AS ' + 'item_' + itemField + ',';
    }
    itemPrefix = itemPrefix.slice(0, -1);
    try {
      const outfit = pool.query(
        `
        SELECT *
        FROM backend_schema.outfit AS table1
        JOIN LATERAL (
          SELECT ${itemPrefix}
          FROM backend_schema.clothing_item 
          WHERE ciid = ANY((ARRAY[table1.clothing_items])::uuid[])
        ) AS table2 ON true
        WHERE table1.oid =  $1
        `,
        [outfitId]
      );
      const temp = await outfit;
      const result = temp.rows;
      const asyncManager = new AsyncManager(result.length);
      const asyncTrigger = once(asyncManager, 'proceed');
      for (const item of result) {
        void urlDownloadHandlerOutfits(item.item_image_url, item, asyncManager);
      }
      const outfits: Record<string, any> = {};
      if (result.length !== 0) {
        for (const field of Object.values(outfitFields)) {
          outfits[field] = result[0][field];
        }
        const categories: Record<string, any> = {};
        Object.values(itemCategories).forEach((value) => {
          categories[value] = [];
        });
        const resolution = await asyncTrigger;
        if (resolution[1] < 0) {
          throw new Error('Some Url Download Requests Failed');
        }
        for (const item of result) {
          const itemFilter: Record<string, any> = {};
          for (const field of Object.values(itemFields)) {
            itemFilter[field] = item[`item_${field}`];
          }
          categories[item.item_category].push(itemFilter);
        }
        outfits.clothing_items = categories;
      }

      responseCallbackGet(null, outfits, res, 'Outfits');
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  if (parse === 'categories') {
    void getOutfitByIdCate(outfitId);
  } else {
    void getOutfitById(outfitId);
  }
});

// Endpoint for retrieving all outfits
router.get('/u/:uid', (req: Request, res: Response): void => {
  const { uid } = req.params;
  const { parse } = req.query;

  const client = pool.connect();

  // Query outfits for the specified user
  const getAllOutfits = async (userId: string): Promise<any> => {
    try {
      const run = pool.query(
        'SELECT * FROM backend_schema.outfit WHERE uid = $1',
        [userId]
      );
      await getUserCore(userId, await client);
      const result = await run;
      const outfits = result.rows;

      responseCallbackGetAll(outfits, res, 'Outfits');
    } catch (error) {
      responseCallbackGet(error, null, res);
    } finally {
      (await client).release();
    }
  };
  const getAllOutfitsCate = async (): Promise<any> => {
    let itemPrefix = '';
    for (const itemField of Object.values(itemFields)) {
      if (itemField === 'color') {
        itemPrefix +=
          ' to_json(' + itemField + ')' + ' AS ' + 'item_' + itemField + ',';
        continue;
      }
      itemPrefix += ' ' + itemField + ' AS ' + 'item_' + itemField + ',';
    }
    itemPrefix = itemPrefix.slice(0, -1);
    try {
      const outfit = pool.query(
        `
        SELECT *
        FROM backend_schema.outfit AS table1
        JOIN LATERAL (
          SELECT ${itemPrefix}
          FROM backend_schema.clothing_item 
          WHERE ciid = ANY((ARRAY[table1.clothing_items])::uuid[])
          AND uid = $1
        ) AS table2 ON true
        WHERE table1.uid = $1
        `,
        [uid]
      );
      await getUserCore(uid, await client);
      const temp = await outfit;
      const result = temp.rows;
      const asyncManager = new AsyncManager(result.length);
      const asyncTrigger = once(asyncManager, 'proceed');
      for (const item of result) {
        void urlDownloadHandlerOutfits(item.item_image_url, item, asyncManager);
      }
      // console.log('test', result);
      const outfits: any[] = [];
      let categories: Record<string, any> = {};
      Object.values(itemCategories).forEach((value) => {
        categories[value] = [];
      });

      if (result.length !== 0) {
        let curoid: string = '';
        let fit: Record<string, any> = {};
        curoid = result[0].oid;
        for (const field of Object.values(outfitFields)) {
          fit[field] = result[0][field];
        }
        const resolution = await asyncTrigger;
        if (resolution[1] < 0) {
          throw new Error('Some Url Download Requests Failed');
        }
        for (const ofit of result) {
          if (ofit.oid !== curoid) {
            curoid = ofit.oid;
            fit.clothing_items = categories;
            outfits.push(fit);
            categories = {};
            Object.values(itemCategories).forEach((value) => {
              categories[value] = [];
            });
            fit = {};
            for (const field of Object.values(outfitFields)) {
              fit[field] = ofit[field];
            }
          }
          const itemFilter: Record<string, any> = {};
          for (const field of Object.values(itemFields)) {
            itemFilter[field] = ofit[`item_${field}`];
          }
          // console.log('Test2: ', itemFilter.category, itemFilter);
          categories[itemFilter.category].push(itemFilter);
          // console.log('Test: ', fit, outfits);
        }
        fit.clothing_items = categories;
        outfits.push(fit);
      }

      responseCallbackGet(null, outfits, res, 'Outfits');
    } catch (error) {
      responseCallbackGet(error, null, res);
    } finally {
      (await client).release();
    }
  };

  if (parse === 'categories') {
    void getAllOutfitsCate();
  } else {
    void getAllOutfits(uid);
  }
});

export { router as default, router as outfitRoute };
