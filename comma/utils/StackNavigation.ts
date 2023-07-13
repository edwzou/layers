import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type StackTypes = {
	// !!! Fix these types
	Login: any;
	'Sign Up': any;
	Profile: any;
	Preview: any;
	Match: any;
};

export const Stack = createNativeStackNavigator<StackTypes>();
