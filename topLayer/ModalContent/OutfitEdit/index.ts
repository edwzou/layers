export type UserOutfit = {
	title: string;
	items: {
		id: string;
		image: HTMLImageElement;
		title: string;
	}[];
	category: string;
};
