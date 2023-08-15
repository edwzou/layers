import { NotFoundError } from "./Errors/NotFoundError";
import { type Response } from 'express';
import { pool } from './sqlImport';

type Callback<T> = (error: Error | null, result: T | null) => void;

export const responseCallback = (error: any, element: any): Callback<any> => {
  if (error != null) {
    return error;
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
    res.status(500).json({ message: 'Internal Server Error' });
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
    res.status(500).json({ message: 'Internal Server Error' });
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
  target: string = ''
): Callback<any> => {
  if (error != null) {
    console.log(error);
    res
      .status(500)
      .json({
        message:
          'Internal Server Error, Failed to Delete ' + target + ': ' + id
      });
    return error;
  } else {
    res.status(200).json({ message: 'Successfully Deleted ' + target + ': ' + id });
    return error;
  }
};

export const responseCallbackUpdate = (
  error: any,
  id: string,
  res: Response,
  target: string = "",
): Callback<any> => {
  if (error != null) {
    console.log(error); 
    res.status(500).json({ message: "Internal Server Error" });
    return error;
  } else {
    res
      .status(200)
      .json({ message: 'Successfully Updated ' + target + ': ' + id });
    return error;
  }
};

export const responseCallbackGetAll = (
  element: any,
  res: Response,
  notFoundObject = ''
): Callback<any> => {
  if (element.length === 0) {
    res.status(400).json({ message: "This User has no " + notFoundObject });
    return element;
  } else {
    res.status(200).json({ message: 'Success', data: element });
    return element;
  }
};

export const getUserCore = async (userId: string): Promise<any> => {
  try {
    const result = await pool.query('SELECT * FROM backend_schema.user WHERE uid = $1', [userId]);
    const user = result.rows[0];
    if (user.length === 0) {
      throw new NotFoundError("User Not Found");
    } 
    return responseCallback(null, user);
  } catch (error) {
    return responseCallback(error, null);
  }
};

export const getOutfitCore = async (oid: string): Promise<any> => {
  try {
    const result = await pool.query('SELECT * FROM backend_schema.outfit WHERE oid = $1', [oid]);
    const user = result.rows[0];
    if (user.length === 0) {
      throw new NotFoundError("Outfit Not Found");
    } 
    return responseCallback(null, user);
  } catch (error) {
    return responseCallback(error, null);
  }
};

export const getItemCore = async (ciid: string): Promise<any> => {
  try {
    const result = await pool.query('SELECT * FROM backend_schema.clothing_item WHERE ciid = $1', [ciid]);
    const user = result.rows[0];
    if (user.length === 0) {
      throw new NotFoundError("Clothing Item Not Found");
    } 
    return responseCallback(null, user);
  } catch (error) {
    return responseCallback(error, null);
  }
};
