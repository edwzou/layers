import axios, { type AxiosError } from 'axios';

export const axiosEndpointErrorHandler = (err: unknown): void => {
	const error = err as Error | AxiosError;
	if (
		axios.isAxiosError(error) &&
		error.response !== null &&
		error.response !== undefined
	) {
		console.log(error.response.data);
		console.log(error.response.status);
		// console.log(error.response.headers);
		// console.log('detail', error.response.data.err);

		alert(error.response.data.message);
	} else {
		// Just a stock error
		//
		console.log(error);
		alert(error);
	}
};

export const axiosEndpointErrorHandlerNoAlert = (err: unknown): void => {
	console.log(err);
	const error = err as Error | AxiosError;
	if (
		axios.isAxiosError(error) &&
		error.response !== null &&
		error.response !== undefined
	) {
		console.log(error.response.data);
		console.log(error.response.status);
		// console.log(error.response.headers);
		// console.log('detail', error.response.data.err);
	} else {
		console.log(error);
	}
};
