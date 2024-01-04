import { type UserClothing } from 'pages/Match';

export interface UserOutfits {
	category: string;
	data: UserOutfit[];
}

export interface UserOutfit {
	oid: string;
	title: string;
	clothing_items: UserClothing[];
	uid: string;
	created_at: string;
}

