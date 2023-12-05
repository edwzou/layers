import { type Request, type Response } from 'express';
import {
  responseCallbackGet,
  responseCallbackGetAll
} from '../../utils/responseCallback';
import { pool } from '../../utils/sqlImport';
import { AsyncManager } from '../../utils/event-emitters/asyncManager';
import { once } from 'node:events';
import { ppurlDownloadHandler } from '../../utils/event-emitters/asyncHandlers';

// Endpoint for searching users by username or name

export const userSearch = async (
  queryString: string,
  res: Response
): Promise<any> => {
  try {
    const query = pool.query(queryString);
    const result = await query;

    const users = result.rows;

    if (users.length === 0) {
      return responseCallbackGetAll(users, res, 'Users');
    }
    const asyncManager = new AsyncManager(users.length);
    const asyncTrigger = once(asyncManager, 'proceed');
    // I'm not sure if this is the fastest way to filter user data.
    // Deleting data could be faster or creating a new user data could be faster
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.private_option === true) {
        const dummy = {
          uid: user.uid,
          username: user.username,
          private_option: user.private_option
        };
        users[i] = dummy;
        console.log('This User is Private, uid: ' + String(user.uid));
        asyncManager.complete('This User is Private, uid: ' + String(user.uid));
      } else {
        void ppurlDownloadHandler(user.pp_url, user, asyncManager);
        delete user.password;
      }
    }
    const resolution = await asyncTrigger;
    if (resolution[1] < 0) {
      throw new Error('Some Url Download Requests Failed');
    }

    responseCallbackGetAll(users, res, 'Users');
  } catch (err) {
    responseCallbackGet(err, null, res);
  }
};
