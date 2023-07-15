export type UserClothing = {
	id: number;
	image: string;
	category: string;
};

export type UserClothingList = {
	outerwear: UserClothing[];
	tops: UserClothing[];
	bottoms: UserClothing[];
	shoes: UserClothing[];
};

export type UserClothingListSingle = {
	outerwear: UserClothing;
	tops: UserClothing;
	bottoms: UserClothing;
	shoes: UserClothing;
};

export type UserSelectedClothingList = {
	outerwear: number;
	tops: number;
	bottoms: number;
	shoes: number;
};

export type UserClothingPadding = {
	outerwear: (UserClothing | Record<string, number>)[];
	tops: (UserClothing | Record<string, number>)[];
	bottoms: (UserClothing | Record<string, number>)[];
	shoes: (UserClothing | Record<string, number>)[];
};
