import axios, { AxiosError } from 'axios';

export const axiosEndpointErrorHandler = (err: unknown): void => {
	const error = err as Error | AxiosError;
	if (axios.isAxiosError(error) && error.response) {
		console.log(error.response.data);
		console.log(error.response.status);
		// console.log(error.response.headers);
		// console.log('detail', error.response.data.err);

		alert(error.response.data.message);
	} else {
		// Just a stock error
		//
		alert(error);
	}
};

export const axiosEndpointErrorHandlerNoAlert = (err: unknown): void => {
	console.log(err);
	const error = err as Error | AxiosError;
	if (axios.isAxiosError(error) && error.response) {
		console.log(error.response.data);
		console.log(error.response.status);
		// console.log(error.response.headers);
		// console.log('detail', error.response.data.err);
	}
};
