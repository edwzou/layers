import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type StackTypes = {
	// !!! Fix these types
	Login: any;
	SignUp: any;
	Profile: any;
	OutfitPreview: any;
	Match: any;
};

export const StackNavigation = {
	Login: 'Login',
	SignUp: 'SignUp',
	Profile: 'Profile',
	OutfitPreview: 'OutfitPreview',
	Match: 'Match',
} as const;

export const Stack = createNativeStackNavigator<StackTypes>();
