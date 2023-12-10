import { baseUrl } from '../utils/apiUtils';
import axios from 'axios';
import { axiosEndpointErrorHandler } from '../utils/ErrorHandlers';

export const getUser = async (userId: string) => {
	try {
		const { data, status } = await axios.get(`${baseUrl}/api/users/${userId}`);

		if (status === 200) {
			return data.data;
		}
	} catch (error) {
		void axiosEndpointErrorHandler(error);
	}
};
