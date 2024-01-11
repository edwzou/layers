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

export interface UserClothingList {
	outerwear: UserClothing[];
	tops: UserClothing[];
	bottoms: UserClothing[];
	shoes: UserClothing[];
}

export interface UserClothingListSingle {
	outerwear: UserClothing | undefined;
	tops: UserClothing | undefined;
	bottoms: UserClothing | undefined;
	shoes: UserClothing | undefined;
}

export interface UserSelectedClothingList {
	outerwear: number;
	tops: number;
	bottoms: number;
	shoes: number;
}

export interface outfitType {
	outerwear: UserClothing;
	tops: UserClothing;
	bottoms: UserClothing;
	shoes: UserClothing;
}

export interface matchType {
	previewData: outfitType;
	matchName: string;
}

export interface UserClothingPadding {
	outerwear: Array<UserClothing | Record<string, number>>;
	tops: Array<UserClothing | Record<string, number>>;
	bottoms: Array<UserClothing | Record<string, number>>;
	shoes: Array<UserClothing | Record<string, number>>;
}

export const isUserClothing = (obj: any): obj is UserClothing =>
	obj !== null &&
	obj !== undefined &&
	typeof obj.ciid === 'string' &&
	typeof obj.image_url === 'string' &&
	typeof obj.category === 'string' &&
	typeof obj.title === 'string' &&
	typeof obj.uid === 'string' &&
	Array.isArray(obj.brands) &&
	typeof obj.size === 'string' &&
	Array.isArray(obj.color) &&
	typeof obj.created_at === 'string';

export const isUserClothingArray = (obj: any): obj is UserClothing[] =>
	Array.isArray(obj) && obj.every(isUserClothing);
