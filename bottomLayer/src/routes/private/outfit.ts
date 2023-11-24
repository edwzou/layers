import { downloadURLFromS3 } from '../../s3/download-url-from-s3';
import { NotFoundError } from '../../utils/Errors/NotFoundError';
import { itemCategories } from '../../utils/constants/itemCategories';
import { itemFields } from '../../utils/constants/itemFields';
import { outfitFields } from '../../utils/constants/outfitFields';
import { urlDownloadHandlerOutfits } from '../../utils/event-emitters/asyncHandlers';
import { AsyncManager } from '../../utils/event-emitters/asyncManager';
import {
  getUserCore,
  responseCallbackDelete,
  responseCallbackGet,
  responseCallbackGetAll,
  responseCallbackPost,
  responseCallbackUpdate
} from '../../utils/responseCallback';
import { pool } from '../../utils/sqlImport';
import express, { type Request, type Response } from 'express';
import { once } from 'node:events';
import {
  getOutfitById,
  getOutfitByIdCate,
  outfitCateQuery
} from '../helper/clothingItem';

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
    // Update the outfit in the database
    try {
      const updateOutfit = await pool.query(
        'UPDATE backend_schema.outfit SET title = $1, clothing_items = $2 WHERE oid = $3 AND uid = $4',
        [title, clothing_items, oid, uid]
      );

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

  //
  // const getOutfitById = async (outfitId: string): Promise<any> => {
  //   try {
  //     const outfit = await pool.query(
  //       'SELECT * FROM backend_schema.outfit WHERE oid = $1 AND uid = $2',
  //       [outfitId, uid]
  //     );
  //     const result = outfit.rows;
  //
  //     responseCallbackGet(null, result, res, 'Outfits');
  //   } catch (error) {
  //     responseCallbackGet(error, null, res);
  //   }
  // };

  // const getOutfitByIdCate = async (outfitId: string): Promise<any> => {

  // try {
  //   const outfit = pool.query(
  //     `
  //     SELECT *
  //     FROM backend_schema.outfit AS table1
  //     LEFT JOIN LATERAL (
  //       SELECT ${itemPrefix}
  //       FROM backend_schema.clothing_item
  //       WHERE ciid = ANY((ARRAY[table1.clothing_items])::uuid[])
  //       AND uid = $2
  //     ) AS table2 ON true
  //     WHERE table1.oid =  $1 AND table1.uid = $2
  //     `,
  //     [outfitId, uid]
  //   );
  //   const temp = await outfit;
  //   const result = temp.rows;
  //   if (result.length === 0) {
  //     return responseCallbackGet(null, result, res, 'Outfits');
  //   }
  //
  //   const asyncManager = new AsyncManager(result.length);
  //   const asyncTrigger = once(asyncManager, 'proceed');
  //   for (const item of result) {
  //     if (item.item_image_url !== null) {
  //       void urlDownloadHandlerOutfits(
  //         item.item_image_url,
  //         item,
  //         asyncManager
  //       );
  //     } else {
  //       console.log('Item has No Image, ciid: ' + String(item.item_ciid));
  //       asyncManager.complete(
  //         'Item has No Image, ciid: ' + String(item.item_ciid)
  //       );
  //     }
  //   }
  //   const outfits: Record<string, any> = {};
  //   for (const field of Object.values(outfitFields)) {
  //     // console.log('test', result[0][field]);
  //     outfits[field] = result[0][field];
  //   }
  //   const categories: Record<string, any> = {};
  //   Object.values(itemCategories).forEach((value) => {
  //     categories[value] = [];
  //   });
  //   const resolution = await asyncTrigger;
  //   if (resolution[1] < 0) {
  //     throw new Error('Some Url Download Requests Failed');
  //   }
  //   for (const item of result) {
  //     console.log('Item: ', item);
  //     if (item.item_category === null) {
  //       continue;
  //     }
  //     const itemFilter: Record<string, any> = {};
  //     // if (item[`item_ciid`] === null) {
  //     //
  //     // }
  //     for (const field of Object.values(itemFields)) {
  //       // console.log(field, item[`item_${field}`]);
  //       itemFilter[field] = item[`item_${field}`];
  //     }
  //     categories[item.item_category].push(itemFilter);
  //   }
  //   outfits.clothing_items = categories;

  //     responseCallbackGet(null, outfits, res, 'Outfits');
  //   } catch (error) {
  //     responseCallbackGet(error, null, res);
  //   }
  // };

  if (parse === 'categories') {
    const queryAdvanced = outfitCateQuery(outfitId, uid);
    console.log('Query Adv: ', queryAdvanced);
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

  // Query outfits for the specified user
  const getAllOutfits = async (uid: string): Promise<any> => {
    try {
      const run = pool.query(
        'SELECT * FROM backend_schema.outfit WHERE uid = $1',
        [uid]
      );
      const result = await run;
      const outfits = result.rows;

      responseCallbackGetAll(outfits, res, 'Outfits');
    } catch (error) {
      responseCallbackGet(error, null, res);
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
      const outfit = await pool.query(
        `
        SELECT *
        FROM backend_schema.outfit AS table1
        LEFT JOIN LATERAL (
          SELECT ${itemPrefix}
          FROM backend_schema.clothing_item 
          WHERE ciid = ANY((ARRAY[table1.clothing_items])::uuid[])
          AND uid = $1
        ) AS table2 ON true
        WHERE table1.uid = $1
        `,
        [uid]
      );
      const result = outfit.rows;
      if (result.length === 0) {
        return responseCallbackGetAll(result, res, 'Outfits');
      }
      const asyncManager = new AsyncManager(result.length);
      const asyncTrigger = once(asyncManager, 'proceed');
      for (const item of result) {
        if (item.item_image_url !== null) {
          void urlDownloadHandlerOutfits(
            item.item_image_url,
            item,
            asyncManager
          );
        } else {
          console.log('Item has No Image, ciid: ' + String(item.item_ciid));
          asyncManager.complete(
            'Item has No Image, ciid: ' + String(item.item_ciid)
          );
        }
      }
      const outfits: any[] = [];
      let categories: Record<string, any> = {};
      Object.values(itemCategories).forEach((value) => {
        categories[value] = [];
      });

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
        if (ofit.item_category === null) {
          continue;
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

      responseCallbackGet(null, outfits, res, 'Outfits');
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  if (parse === 'categories') {
    void getAllOutfitsCate();
  } else {
    void getAllOutfits(uid);
  }
});

export { router as default, router as privateOutfitRoute };
