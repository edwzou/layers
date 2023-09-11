export interface UserClothing {
	id: string;
	image: string;
	category: string;
	title: string;
	size: string;
	colors: [string, string][]
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
