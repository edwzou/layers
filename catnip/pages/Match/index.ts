export type UserClothing = {
	id: number;
	image?: string;
	category?: string;
};

export type UserClothingList = {
	outerwear: UserClothing[];
	tops: UserClothing[];
	bottoms: UserClothing[];
	shoes: UserClothing[];
};
