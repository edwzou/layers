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
		alert(error.response.data.message);
	} else {
		console.log(error); // Just a stock error
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
	} else {
		console.log(error);
	}
};
