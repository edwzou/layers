import { baseUrl } from '../utils/apiUtils';
import axios from 'axios';
import { axiosEndpointErrorHandler } from '../utils/ErrorHandlers';
import { type Dispatch, type SetStateAction } from 'react';
import { type User } from '../types/User';
import { nullUser } from '../constants/baseUsers';
import { type UserReducerProps } from '../Contexts/UserContext';

export const getForeignUser = async (userId: string): Promise<User> => {
	try {
		const { data, status } = await axios.get(`${baseUrl}/api/users/${userId}`);

		if (status === 200) {
			return data.data;
		}
	} catch (error) {
		axiosEndpointErrorHandler(error);
	}
	return nullUser;
};

export const getUser = async (
	setUser: Dispatch<SetStateAction<User>>
): Promise<void> => {
	try {
		const { data, status } = await axios.get(`${baseUrl}/api/private/users`);

		if (status === 200) {
			setUser(data.data);
		} else {
			throw Error('could not get user');
		}
	} catch (error) {
		axiosEndpointErrorHandler(error);
	}
};

export const returnGetUser = async (): Promise<User> => {
	try {
		const { data, status } = await axios.get(`${baseUrl}/api/private/users`);

		if (status === 200) {
			return data.data;
		} else {
			throw Error('could not get user');
		}
	} catch (error) {
		axiosEndpointErrorHandler(error);
	}
	return nullUser;
};

export const updateUser = async (
	dispatch: Dispatch<UserReducerProps>
): Promise<void> => {
	const promUser = await returnGetUser();
	dispatch({
		type: 'change user',
		user: promUser,
	});
};

export const getUpdateUser = async (
	update: Dispatch<UserReducerProps>
): Promise<void> => {
	try {
		const { data, status } = await axios.get(`${baseUrl}/api/private/users`);

		if (status === 200) {
			update({
				type: 'change user',
				user: data.data,
			});
		} else {
			throw Error('could not get user');
		}
	} catch (error) {
		axiosEndpointErrorHandler(error);
	}
};
