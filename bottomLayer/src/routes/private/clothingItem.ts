import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import {
	responseCallbackDelete,
	responseCallbackDeleteAll,
	responseCallbackPost,
	responseCallbackUpdate,
} from '../../utils/responseCallback';
import { convertImage } from '../../s3/convert-image';
import { deleteObjectFromS3 } from '../../s3/delete-object-from-s3';
import { v4 as uuidv4 } from 'uuid';
import {
	getClothingById,
	getAllClothing,
	getAllClothingCate,
} from '../helper/clothingItem';
import { type itemCategories } from '../../utils/constants/itemCategories';
import { type colors } from '../../utils/constants/colors';
const router = express.Router();

// Endpoint for creating a specific clothing item
router.post('/', (req: Request, res: Response): void => {
	const uid = req.user as string;
	const { image, category, title, brands, size, color } = req.body;
	const insertClothingItem = async (): Promise<any> => {
		try {
			const ciid = uuidv4();
			const imgRef = await convertImage(image, ciid, true);
			await pool.query(
				`INSERT INTO backend_schema.clothing_item (ciid, image_url, category, title, brands, size, color, uid)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
				[ciid, imgRef, category, title, brands, size, color, uid]
			);

			responseCallbackPost(null, res, 'Clothing Item: ' + ciid);
		} catch (error) {
			responseCallbackPost(error, res);
		}
	};
	void insertClothingItem();
});

// Endpoint for deleting a specific clothing_item
router.delete('/:ciid', (req: Request, res: Response): void => {
	const uid = req.user as string;
	const { ciid } = req.params;
	const deleteItem = async (ciid: string): Promise<void> => {
		const client = pool.connect();
		try {
			const async1 = deleteObjectFromS3(ciid);
			const cli = await client;
			const async2 = pool.query(
				'DELETE FROM backend_schema.clothing_item WHERE ciid = $1 AND uid = $2',
				[ciid, uid]
			);
			const async3 = cli.query(
				`UPDATE backend_schema.outfit SET clothing_items = array_remove(clothing_items, '${ciid}')`
			);

			const removeFromOutfit = await async3;
			const deleteItem = await async2;
			await async1;

			responseCallbackDelete(
				null,
				ciid,
				res,
				'Clothing Item',
				deleteItem.rowCount
			);
		} catch (error) {
			responseCallbackDelete(error, ciid, res, 'Clothing Item');
		} finally {
			(await client).release();
		}
	};
	void deleteItem(ciid);
});

// Endpoint for updating a specific clothing_item
router.put('/:ciid', (req: any, res: any): void => {
	const uid = req.user as string;
	const { ciid } = req.params;
	const {
		category,
		title,
		size,
		color,
	}: {
		category: itemCategories;
		title: string;
		size: string;
		color: colors[];
	} = req.body;

	const updateItem = async (ciid: string): Promise<void> => {
		try {
			let query = 'UPDATE backend_schema.clothing_item SET';

			if (category !== undefined) {
				query += ` category = '${category}',`;
			}
			if (title !== undefined) {
				query += ` title = '${title}',`;
			}
			if (size !== undefined) {
				query += ` size = '${size}',`;
			}
			if (color !== undefined) {
				const formattedUuidArray = color.map((col) => `'${col}'::color_enum`);
				query += ` color = ARRAY[${formattedUuidArray.join(', ')}],`;
			}

			// Check if at least one field is provided
			if (query === 'UPDATE backend_schema.clothing_item SET') {
				throw new Error('No Fields To Update');
			}

			query = query.slice(0, -1);
			query += ` WHERE ciid = '${ciid}' AND uid = '${uid}'`;

			// Execute the update query
			const updateResult = await pool.query(query);
			responseCallbackUpdate(
				null,
				ciid,
				res,
				'Clothing Item',
				updateResult.rowCount
			);
		} catch (error) {
			responseCallbackUpdate(error, ciid, res, 'Clothing Item');
		}
	};

	void updateItem(ciid);
});

// Endpoint for retrieving the logged in users clothing item
router.get('/:itemId', (req: Request, res: Response): void => {
	const uid = req.user as string;
	const { itemId } = req.params;

	const query = `
        SELECT *, to_json(color) AS color FROM backend_schema.clothing_item WHERE ciid = '${itemId}' AND uid = '${uid}'`;
	void getClothingById(query, res);
});

// Endpoint for retrieving all a logged in users clothing items
router.get('/', (req: Request, res: Response): void => {
	const uid = req.user as string;
	const { parse } = req.query;
	const query = `SELECT *, to_json(color) AS color FROM backend_schema.clothing_item WHERE uid = '${uid}'`;

	if (parse === 'categories') {
		void getAllClothingCate(query, res);
	} else {
		void getAllClothing(query, res);
	}
});

// Endpoint for deleting all clothing items associated with the user
router.delete('/', (req: Request, res: Response): void => {
	const uid = req.user as string;

	const deleteAllClothingItems = async (): Promise<void> => {
		try {
			const ciidsResult = await pool.query(
				'SELECT ciid FROM backend_schema.clothing_item WHERE uid = $1',
				[uid]
			);
			const ciids = ciidsResult.rows.map((row) => row.ciid);
			const [deleteClothingItems] = await Promise.all([
				pool.query('DELETE FROM backend_schema.clothing_item WHERE uid = $1', [
					uid,
				]),
				ciids.map((ciid) => deleteObjectFromS3(ciid)),
			]);

			responseCallbackDeleteAll(
				null,
				res,
				'Clothing Item',
				deleteClothingItems.rowCount
			);
		} catch (error) {
			responseCallbackDeleteAll(error, res, 'Clothing Item');
		}
	};

	void deleteAllClothingItems();
});

export { router as default, router as privateClothingRoute };
