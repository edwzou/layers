import { NotFoundError } from './Errors/NotFoundError';
import { type Response } from 'express';
import { UnknownError } from './Errors/UnknownError';
import { type PoolClient } from 'pg';

type Callback<T> = (error: Error | null, result: T | null) => void;

export const responseCallback = (error: any, element: any): Callback<any> => {
  if (error != null) {
    console.log(error);
    throw error;
  } else {
    return element;
  }
};

export const responseCallbackGet = (
  error: any,
  element: any,
  res: Response,
  notFoundObject = ''
): Callback<any> => {
  if (error != null) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error', error });
    return error;
  } else if (element === null || element === undefined || element.length === 0) {
    res.status(400).json({ message: notFoundObject + ' Not Found' });
    return element;
  } else {
    res.status(200).json({ message: 'Success', data: element });
    return element;
  }
};

export const responseCallbackPost = (
  error: any,
  res: Response,
  target = ''
): Callback<any> => {
  if (error != null) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error', error });
    return error;
  } else {
    res.status(200).json({ message: 'Successfully Created a ' + target });
    return error;
  }
};

export const responseCallbackDelete = (
  error: any,
  id: string,
  res: Response,
  target: string = '',
  rowCount: number = 1
): Callback<any> => {
  if (rowCount === 0) {
    throw new NotFoundError(target + ' Not Found, id: ' + id);
  } else if (error != null) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error, Failed to Delete ' + target + ': ' + id,
      error
    });
    return error;
  } else {
    res
      .status(200)
      .json({ message: 'Successfully Deleted ' + target + ': ' + id });
    return error;
  }
};

export const responseCallbackUpdate = (
  error: any,
  id: string,
  res: Response,
  target: string = '',
  rowCount: number = 1
): Callback<any> => {
  if (rowCount === 0) {
    throw new NotFoundError(target + ' Not Found, id: ' + id);
  } else if (error != null) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error, Failed to Delete ' + target + ': ' + id, error });
    return error;
  } else {
    res
      .status(200)
      .json({ message: 'Successfully Updated ' + target + ': ' + id });
    return error;
  }
};

export const responseCallbackFollow = (
  error: any,
  uid1: string,
  uid2: string,
  res: Response
): Callback<any> => {
  if (error != null) {
    console.log(error);
    res.status(500).json({
      // Where following and follower are the uids
      message: 'Internal Server Error: ' + uid1 + ' Failed to Follow ' + uid2,
      error
    });
    return error;
  } else {
    res
      .status(200)
      .json({ message: uid1 + ' Successfully Followed ' + uid2 });
    return error;
  }
};

export const responseCallbackUnFollow = (
  error: any,
  username: string,
  toUnFollowUsername: string,
  res: Response
): Callback<any> => {
  if (error != null) {
    console.log(error);
    res.status(500).json({
      message:
        'Internal Server Error: ' +
        username +
        ' Failed to unFollow ' +
        toUnFollowUsername,
      error
    });
    return error;
  } else {
    res
      .status(200)
      .json({
        message: username + ' Successfully UnFollowed ' + toUnFollowUsername
      });
    return error;
  }
};

export const responseCallbackGetAll = (
  element: any,
  res: Response,
  notFoundObject = ''
): Callback<any> => {
  if (element.length === 0) {
    res.status(400).json({ message: 'This User has no ' + notFoundObject });
    return element;
  } else {
    res.status(200).json({ message: 'Success', data: element });
    return element;
  }
};

export const getUserCore = async (userId: string, client: PoolClient): Promise<any> => {
  try {
    const result = await client.query(
      'SELECT * FROM backend_schema.user WHERE uid = $1',
      [userId]
    );
    const user = result.rows;
    if (user.length === 0) {
      throw new NotFoundError('User Not Found, uid: ' + userId);
    }
    return responseCallback(null, user);
  } catch (error) {
    return responseCallback(error, null);
  }
};

export const clientFollowTransaction = async (
  uid: string,
  query: string,
  client: Promise<PoolClient>,
  otherQueries: number[],
  resolution: number = -1
): Promise<any> => {
  const clientOn = await client;
  try {
    await clientOn.query('BEGIN');
    const result = await clientOn.query(query);
    resolution = result.rowCount;
    if (resolution === 0) {
      throw new NotFoundError('User Not Found, uid: ' + uid);
    }
    for (let i = 0; i < otherQueries.length; i++) {
      while (otherQueries[i] === -1) {
        continue;
      }
      if (otherQueries[i] === 0) {
        throw new UnknownError('The error is unknown in this method');
      }
    }
    await clientOn.query('COMMIT');
    return responseCallback(null, true);
  } catch (error) {
    await clientOn.query('ROLLBACK');
    if (error instanceof UnknownError) {
      return responseCallback(null, 'Unknown Error');
    } else if (error instanceof NotFoundError) {
      return responseCallback(null, 'NotFound Error');
    }
    return responseCallback(error, null);
  }
};
