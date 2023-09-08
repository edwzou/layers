import { Image } from "react-native-svg";
import { UserClothing } from "../../pages/Match";
import { UserOutfit } from "../../pages/OutfitView";

export interface User {
	uid: string,
	first_name: string,
	last_name: string,
	email: string,
	username: string,
	password: string,
	private_option: string,
	followers: string[],
	following: string[],
	profile_picture: string,
}

export interface UserItems {
    category: string,
    data: UserClothing[] | UserOutfit[],
}