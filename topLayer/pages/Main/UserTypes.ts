import { type UserClothing } from '../Match';

export interface User {
	uid: string;
	first_name: string;
	last_name: string;
	email: string;
	username: string;
	private_option: boolean;
	followers: string[];
	following: string[];
	profile_picture: string;
}

export interface formUser {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	private_option: boolean;
	profile_picture: string;
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

export interface userToFetch {
	uid: string;
	marked: boolean;
}

export interface UserItems {
	category: string;
	data: UserClothing[];
}

export const isMarkedPrivateUser = (obj: any): obj is markedPrivateUser => {
	return !('first_name' in obj);
};
// export interface UserItems {
//     category: string,
//     data: UserClothing[] | UserOutfit[],
// }
