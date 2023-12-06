import { Image } from 'react-native-svg';
import { UserClothing } from '../../pages/Match';
import { UserOutfit } from '../../pages/OutfitView';

export interface User {
	uid: string;
	first_name: string;
	last_name: string;
	email: string;
	username: string;
	private_option: boolean;
	followers: string[];
	following: string[];
	pp_url: string;
}

export interface markedUser extends User {
	marked: boolean;
}

export interface privateUser {
	uid: string;
	username: string;
	private_option: boolean;
}

export interface markedPrivateUser extends privateUser {
	marked: boolean;
}

export interface UserItems {
	category: string;
	data: UserClothing[];
}

export const isPrivateUser = (obj: any): obj is privateUser => {
	return !('first_name' in obj);
};

// export interface UserItems {
//     category: string,
//     data: UserClothing[] | UserOutfit[],
// }

