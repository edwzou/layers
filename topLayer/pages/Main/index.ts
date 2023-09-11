import { Image } from "react-native-svg";
import { UserClothing } from "../../pages/Match";
import { UserOutfit } from "../../pages/OutfitView";

export interface User {
	uid: string,
	firstName: string,
	lastName: string,
	email: string,
	username: string,
	password: string,
	privateOption: string,
	followers: string[],
	following: string[],
	profilePicture: Image,
	items: UserItems[],
}

export interface UserItems {
    category: string,
    data: UserClothing[] | UserOutfit[],
}