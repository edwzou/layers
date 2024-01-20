export interface ClothingCreationProps {
	image: string;
	category: string;
	title: string;
	brands: string[];
	size: string;
	color: string[];
}

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
