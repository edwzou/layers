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
	first_name: string;
	last_name: string;
	pp_url: string;
	private_option: boolean;
}

export interface markedPrivateUser extends privateUser {
	marked: boolean;
}

export const isMarkedPrivateUser = (obj: any): obj is markedPrivateUser => {
	return !('first_name' in obj);
};
