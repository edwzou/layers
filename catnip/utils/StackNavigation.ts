import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type StackTypes = {
	// !!! Fix these types
	Login: any;
	SignUp: any;
	Profile: any;
	OutfitPreview: any;
};

export const StackNavigation = {
	Login: 'Login',
	SignUp: 'SignUp',
	Profile: 'Profile',
	OutfitPreview: 'OutfitPreview',
} as const;

export const Stack = createNativeStackNavigator<StackTypes>();
