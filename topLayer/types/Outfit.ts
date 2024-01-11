import { isUserClothing, type UserClothing } from './Clothing';

export interface UserOutfit {
	oid: string;
	title: string;
	clothing_items: UserClothing[];
	uid: string;
	created_at: string;
}

export const isUserOutfit = (obj: any): obj is UserOutfit =>
	obj !== null &&
	obj !== undefined &&
	typeof obj.oid === 'string' &&
	typeof obj.title === 'string' &&
	Array.isArray(obj.clothing_items) &&
	obj.clothing_items.every(isUserClothing) === true &&
	typeof obj.uid === 'string' &&
	typeof obj.created_at === 'string';

export const isUserOutfitArray = (obj: any): obj is UserOutfit[] =>
	Array.isArray(obj) && obj.every(isUserOutfit);
