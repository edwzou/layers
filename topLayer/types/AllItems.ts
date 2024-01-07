import { type UserClothing } from './Clothing';
import { type UserOutfit } from './Outfit';

export interface UserAllItems {
	category: string;
	data: UserClothing[] | UserOutfit[];
}
