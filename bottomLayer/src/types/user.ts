export interface User {
	uid: string;
	first_name: string;
	last_name: string;
	email: string;
	username: string;
	password: string;
	private_option: boolean;
	followers: string[];
	following: string[];
	profile_picture: string;
}
