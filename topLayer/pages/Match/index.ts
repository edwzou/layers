import { type UserOutfit } from '../../pages/OutfitView';

export interface UserClothing {
	ciid: string;
	image_url: string;
	category: string;
	title: string;
	uid: string;
	brands: string[];
	size: string;
	color: string[];
	created_at: string;
}

export interface UserAllItems {
	category: string;
	data: UserClothing[] | UserOutfit[];
}

export interface UserClothingList {
	outerwear: UserClothing[];
	tops: UserClothing[];
	bottoms: UserClothing[];
	shoes: UserClothing[];
}

export interface UserClothingListSingle {
	outerwear: UserClothing;
	tops: UserClothing;
	bottoms: UserClothing;
	shoes: UserClothing;
}

export interface UserSelectedClothingList {
	outerwear: number;
	tops: number;
	bottoms: number;
	shoes: number;
}

export interface UserClothingPadding {
	outerwear: Array<UserClothing | Record<string, number>>;
	tops: Array<UserClothing | Record<string, number>>;
	bottoms: Array<UserClothing | Record<string, number>>;
	shoes: Array<UserClothing | Record<string, number>>;
}
