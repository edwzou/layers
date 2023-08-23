export interface UserOutfit {
	title: string;
	items: Array<{
		id: string;
		image: HTMLImageElement;
		title: string;
	}>;
	category: string;
}
