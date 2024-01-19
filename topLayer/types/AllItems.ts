import { type UserClothing } from './Clothing';
import { type UserOutfit } from './Outfit';

export interface UserAllItems {
	category: string;
	data: UserClothing[] | UserOutfit[];
}

export type UserAllItems2 = Record<string, UserClothing[] | UserOutfit[]>;
export type UserClothes = Record<string, UserClothing[]>;
export type UserOutfits = Record<string, UserOutfit[]>;
