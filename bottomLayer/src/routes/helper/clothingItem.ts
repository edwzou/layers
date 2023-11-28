import { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import { downloadURLFromS3 } from '../../s3/download-url-from-s3';
import { AsyncManager } from '../../utils/event-emitters/asyncManager';
import {
  urlDownloadHandler,
  urlDownloadHandlerOutfits
} from '../../utils/event-emitters/asyncHandlers';
import { once } from 'node:events';
import {
  getUserCore,
  responseCallbackGet,
  responseCallbackGetAll
} from '../../utils/responseCallback';
import { itemCategories } from '../../utils/constants/itemCategories';
import { itemFields } from '../../utils/constants/itemFields';
import { outfitFields } from '../../utils/constants/outfitFields';
import { type PoolClient } from 'pg';

// Get Clothing Item By Id
export const getClothingById = async (
  queryString: string,
  res: Response
): Promise<any> => {
  try {
    const query = pool.query(queryString);
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

// Gets All Clothing Items for a User
export const getAllClothing = async (
  queryString: string,
  res: Response,
  client: Promise<PoolClient> | null = null,
  uid: string = ''
): Promise<any> => {
  try {
    const run = pool.query(queryString);
    if (client !== null) {
      await getUserCore(uid, await client);
    }
    const result = await run;
    const items = result.rows;
    if (items.length === 0) {
      return responseCallbackGetAll(items, res, 'Clothing Item');
    }
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
    if (client !== null) {
      (await client).release();
    }
  }
};

// Gets All Clothing Items for a User in Parsed Categorical Format
export const getAllClothingCate = async (
  queryString: string,
  res: Response,
  client: Promise<PoolClient> | null = null,
  uid: string = ''
): Promise<any> => {
  try {
    const run = pool.query(queryString);
    if (client !== null) {
      await getUserCore(uid, await client);
    }
    const result = await run;
    const items = result.rows;
    if (items.length === 0) {
      return responseCallbackGetAll(items, res, 'Clothing Item');
    }
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
    if (client !== null) {
      (await client).release();
    }
  }
};

// Gets an Outfit By Id
export const getOutfitById = async (
  queryString: string,
  res: Response
): Promise<any> => {
  try {
    const outfit = pool.query(queryString);

    const temp = await outfit;
    const result = temp.rows;

    responseCallbackGet(null, result, res, 'Outfits');
  } catch (error) {
    responseCallbackGet(error, null, res);
  }
};

// Writes out the a prefix for Outfit Query so Clothing Item and Outfit fields don't overlap
export const outfitCateQueryPrefix = (): string => {
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
  return itemPrefix;
};

// Creates the Query to Query Outfits
export const outfitCateQuery = (
  outfitId: string = '',
  uid: string = ''
): string => {
  const itemPrefix = outfitCateQueryPrefix();
  let query = `
        SELECT *
        FROM backend_schema.outfit AS table1
        LEFT JOIN LATERAL (
          SELECT ${itemPrefix}
          FROM backend_schema.clothing_item 
          WHERE ciid = ANY((ARRAY[table1.clothing_items])::uuid[])
        `;
  if (uid !== '') {
    query += ` AND uid = '${uid}'`;
  }
  query += ') AS table2 ON true ';
  if (outfitId !== '' && uid !== '') {
    query += ` WHERE table1.oid = '${outfitId}' AND table1.uid = '${uid}'`;
  } else if (outfitId !== '') {
    query += ` WHERE table1.oid = '${outfitId}'`;
  } else {
    query += ` WHERE table1.uid = '${uid}'`;
  }
  return query;
};

// Gets an Outfit By Id parsed into Categorical Format
export const getOutfitByIdCate = async (
  queryString: string,
  res: Response
): Promise<any> => {
  try {
    const outfit = pool.query(queryString);
    const temp = await outfit;
    const result = temp.rows;
    if (result.length === 0) {
      return responseCallbackGet(null, result, res, 'Outfits');
    }

    const asyncManager = new AsyncManager(result.length);
    const asyncTrigger = once(asyncManager, 'proceed');
    for (const item of result) {
      if (item.item_image_url !== null) {
        void urlDownloadHandlerOutfits(item.item_image_url, item, asyncManager);
      } else {
        console.log('Item has No Image, ciid: ' + String(item.item_ciid));
        asyncManager.complete(
          'Item has No Image, ciid: ' + String(item.item_ciid)
        );
      }
    }
    const outfits: Record<string, any> = {};
    for (const field of Object.values(outfitFields)) {
      // console.log('test', result[0][field]);
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
      console.log('Item: ', item);
      if (item.item_category === null) {
        continue;
      }
      const itemFilter: Record<string, any> = {};
      // if (item[`item_ciid`] === null) {
      //
      // }
      for (const field of Object.values(itemFields)) {
        // console.log(field, item[`item_${field}`]);
        itemFilter[field] = item[`item_${field}`];
      }
      categories[item.item_category].push(itemFilter);
    }
    outfits.clothing_items = categories;

    responseCallbackGet(null, outfits, res, 'Outfits');
  } catch (error) {
    responseCallbackGet(error, null, res);
  }
};

// Gets all outfits for a User
export const getAllOutfits = async (
  queryString: string,
  res: Response,
  client: Promise<PoolClient> | null = null,
  uid: string = ''
): Promise<any> => {
  try {
    const run = pool.query(queryString);
    if (client !== null) {
      await getUserCore(uid, await client);
    }
    const result = await run;
    const outfits = result.rows;

    responseCallbackGetAll(outfits, res, 'Outfits');
  } catch (error) {
    responseCallbackGet(error, null, res);
  } finally {
    if (client !== null) {
      (await client).release();
    }
  }
};

// Gets all outfits for a User Parsed into Categorical Format
export const getAllOutfitsCate = async (
  queryString: string,
  res: Response,
  client: Promise<PoolClient> | null = null,
  uid: string = ''
): Promise<any> => {
  try {
    const outfit = pool.query(queryString);
    if (client !== null) {
      await getUserCore(uid, await client);
    }
    const temp = await outfit;
    const result = temp.rows;
    if (result.length === 0) {
      return responseCallbackGetAll(result, res, 'Outfits');
    }
    const asyncManager = new AsyncManager(result.length);
    const asyncTrigger = once(asyncManager, 'proceed');
    for (const item of result) {
      if (item.item_image_url !== null) {
        void urlDownloadHandlerOutfits(item.item_image_url, item, asyncManager);
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
  } finally {
    if (client !== null) {
      (await client).release();
    }
  }
};