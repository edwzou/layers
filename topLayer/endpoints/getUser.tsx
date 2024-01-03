import { baseUrl } from '../utils/apiUtils';
import axios from 'axios';
import { axiosEndpointErrorHandler } from '../utils/ErrorHandlers';
import { type Dispatch, type SetStateAction } from 'react';
import { type User } from '../pages/Main/UserTypes';

export const getForeignUser = async (userId: string): Promise<void> => {
	try {
		const { data, status } = await axios.get(`${baseUrl}/api/users/${userId}`);

		if (status === 200) {
			return data.data;
		}
	} catch (error) {
		axiosEndpointErrorHandler(error);
	}
};

export const getUser = async (
	setUser: Dispatch<SetStateAction<User | null>>
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
