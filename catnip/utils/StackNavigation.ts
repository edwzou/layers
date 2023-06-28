import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type StackTypes = {
	// !!! Fix these types
	Login: any;
	SignUp: any;
	Profile: any;
	Modal: any;
};

export const StackNavigation = {
	Login: 'Login',
	SignUp: 'SignUp',
	Profile: 'Profile',
	Modal: 'My Modal',
} as const;

export const Stack = createNativeStackNavigator<StackTypes>();
