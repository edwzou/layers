import Constants from 'expo-constants';
const { manifest } = Constants;

export const baseUrl = manifest?.debuggerHost
	? `http://${manifest.debuggerHost.split(':').shift()}:1234`
	: null;
