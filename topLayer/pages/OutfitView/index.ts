import { UserClothing } from "../Match";

export interface UserOutfit {
	title: string;
	items:  UserClothing[];
	category: any; /// !!! change any type
}