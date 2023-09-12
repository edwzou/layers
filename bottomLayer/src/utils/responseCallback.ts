import { NotFoundError } from './Errors/NotFoundError';
import { type Response } from 'express';
import { UnknownError } from './Errors/UnknownError';
import { once } from 'node:events';
import { QueryManager } from './event-emitters/queryManager';
import { type PoolClient } from 'pg';

type Callback<T> = (error: Error | null, result: T | null) => void;

export const responseCallback = (error: any, element: any): Callback<any> => {
  if (error != null) {
    throw error;
  } else {
    return element;
  }
};

export const responseCallback2 = (error: any, element: any): Callback<any> => {
  if (error != null) {
    console.log('Error: ', error);
    throw error;
  } else {
    return element;
  }
};

// All get calls to postgresql should fail if rowcount === 0
export const responseCallbackGet = (
  error: any,
  element: any,
  res: Response,
  notFoundObject = ''
): Callback<any> => {
  if (error != null) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
    return error;
  } else if (element.length === 0) {
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
    res.status(500).json({ message: 'Internal Server Error', error: error });
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
    res.status(500).json({
      message: 'Internal Server Error, Failed to Update ' + target + ': ' + id,
      error: error
    });
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
  followerId: string,
  followedId: string,
  res: Response
): Callback<any> => {
  if (error != null) {
    console.log(error);
    res.status(500).json({
      message:
        'Internal Server Error: ' +
        followerId +
        ' Failed to Follow ' +
        followedId,
      error: error,
      log: error.message
    });
    return error;
  } else {
    res
      .status(200)
      .json({ message: followerId + ' Successfully Followed ' + followedId });
    return error;
  }
};

export const responseCallbackUnFollow = (
  error: any,
  unfollowerId: string,
  unfollowedId: string,
  res: Response
): Callback<any> => {
  if (error != null) {
    console.log(error);
    res.status(500).json({
      message:
        'Internal Server Error: ' +
        unfollowerId +
        ' Failed to UnFollow ' +
        unfollowedId,
      error: error,
      log: error.message
    });
    return error;
  } else {
    res.status(200).json({
      message: unfollowerId + ' Successfully UnFollowed ' + unfollowedId
    });
    return error;
  }
};

export const responseCallbackGetAll = (
  element: any,
  res: Response,
  notFoundObject = ''
): Callback<any> => {
  if (element === null || element === undefined || element.length === 0) {
    res.status(400).json({ message: 'This User has no ' + notFoundObject });
    return element;
  } else {
    res.status(200).json({ message: 'Success', data: element });
    return element;
  }
};

export const getUserCore = async (
  userId: string,
  client: PoolClient
): Promise<any> => {
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

export const clientUnFollow = async (
  uid: string,
  query: string,
  client: Promise<PoolClient>,
  queryEmitter: QueryManager,
  failure: string = ''
): Promise<any> => {
  const clientOn = await client;
  // console.log("Client1: ", clientOn);
  console.log('query1: ', query);
  try {
    const queryTrigger = once(queryEmitter, 'proceed');
    const result = await clientOn.query(query);

    console.log('result: ', result);
    if (result.rowCount === 0) {
      queryEmitter.failure(failure, query);
      throw new NotFoundError('No change in user, uid: ' + uid);
    } else {
      queryEmitter.complete(query);
    }

    const resolution = await queryTrigger;
    // One optimization is to move the following code before the query is even called
    // So as to skip the query if a failure is triggered before the query is sent.
    // If we were to throw an error from the emitter, then we wouldn't be sure what happens to the query sent afterwards.
    // Given that the failure will most likely occur while the query is running
    // Also since the queries are all sent together at relatively the same time, it is highly unlikely the query will fail
    // before the other queries are sent
    if (resolution[1] < 0) {
      throw new UnknownError('The error is unknown in this method.');
    }
    return responseCallback(null, null);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === UnknownError.name) {
        // this is only called on 0,1
        console.log('hit1');
        return responseCallback(
          null,
          'Error is unknown to this query, query:\n' + query
        );
      } else if (error.name === NotFoundError.name) {
        console.log('hit2');
        return responseCallback(null, 'No change in user, uid: ' + uid);
      }
      console.log(
        'hit3',
        typeof error,
        error instanceof NotFoundError,
        error.name
      );

      queryEmitter.utterFailure(error.message, query);
      return responseCallback(error, null);
    }
  }
};

export const clientFollow = async (
  uid: string,
  query: string,
  client: Promise<PoolClient>,
  queryEmitter: QueryManager,
  failure: string = ''
): Promise<any> => {
  const clientOn = await client;
  try {
    const queryTrigger = once(queryEmitter, 'proceed');
    const result = await clientOn.query(query);

    if (result.rowCount === 0) {
      queryEmitter.failure(failure, query);
      throw new NotFoundError('No change in user, uid: ' + uid);
    } else {
      queryEmitter.complete(query);
    }

    const resolution = await queryTrigger;
    // One optimization is to move the following code before the query is even called
    // So as to skip the query if a failure is triggered before the query is sent.
    // If we were to throw an error from the emitter, then we wouldn't be sure what happens to the query sent afterwards.
    // Given that the failure will most likely occur while the query is running
    // Also since the queries are all sent together at relatively the same time, it is highly unlikely the query will fail
    // before the other queries are sent
    if (resolution[1] < 0) {
      throw new UnknownError(
        'The error is unknown in this method, need to revert its changes.'
      );
    }
    return responseCallback(null, null);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === UnknownError.name) {
        // this is only called on 0,1
        return await clientUndoFollowTransaction(
          uid,
          revertFollowQuery(query),
          clientOn
        );
      } else if (error.name === NotFoundError.name) {
        return responseCallback(null, 'No change in user, uid: ' + uid);
      }

      queryEmitter.utterFailure(error.message, query);
      return responseCallback(error, null);
    }
  }
};

export const clientUndoFollowTransaction = async (
  uid: string,
  query: string,
  client: PoolClient
): Promise<any> => {
  try {
    await client.query('BEGIN');
    const result = await client.query(query);
    if (result.rowCount === 0) {
      throw new Error(
        'No change in user while reverting initial query, uid: ' + uid
      );
    }
    await client.query('COMMIT');
    return responseCallback(
      null,
      'Follow request reverted for uid: ' + uid + '\n with query: ' + query
    );
  } catch (error) {
    await client.query('ROLLBACK');
    return responseCallback(
      null,
      'No change in user while reverting initial query, uid: ' + uid
    );
  }
};

export const revertFollowQuery = (query: string): string => {
  const remove = query.replace('array_append', 'array_remove');
  const indexOfAnd = remove.indexOf('AND');
  const reversion = remove.substring(0, indexOfAnd);
  console.log('reversion: ', reversion);
  return reversion;
};

export const clientFollowTransaction2 = async (
  uid: string,
  query: string,
  client: Promise<PoolClient>,
  index: number,
  otherQueries: number[]
): Promise<any> => {
  const clientOn = await client;
  // console.log("Client2: ", clientOn);
  console.log('query2: ', query);
  try {
    await clientOn.query('BEGIN');
    console.log('running2');
    const result = await clientOn.query(query);
    otherQueries[index] = result.rowCount;
    console.log('set2: ', otherQueries);
    if (otherQueries[index] === 0) {
      throw new NotFoundError('No change in user, uid: ' + uid);
    }
    for (let i = 0; i < otherQueries.length; i++) {
      while (otherQueries[i] === -1) {
        // console.log("queries: ", otherQueries)
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
      return responseCallback(null, 'No change in user, uid: ' + uid);
    }
    return responseCallback(error, null);
  }
};
