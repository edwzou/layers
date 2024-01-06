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
	private_option: boolean;
	pp_url: string;
}

export interface markedPrivateUser extends privateUser {
	marked: boolean;
}

export const isMarkedUser = (
	obj: any
): obj is markedUser | markedPrivateUser => {
	return obj.marked !== null && obj.marked !== undefined;
};

export const isPrivateUser = (
	obj: any
): obj is markedPrivateUser | privateUser => {
	return obj.private_option === true;
};
