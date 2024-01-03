import { type formUser, type User } from '../pages/Main/UserTypes';

export const defaultFormUser: formUser = {
	first_name: '',
	last_name: '',
	username: '',
	email: '',
	password: '',
	private_option: false,
	profile_picture: '',
};

export const nullUser: User = {
	uid: '',
	first_name: '',
	last_name: '',
	username: '',
	email: '',
	private_option: false,
	followers: [],
	following: [],
	pp_url: '',
};
