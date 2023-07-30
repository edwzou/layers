import { createNativeStackNavigator } from '@react-navigation/native-stack';

export interface StackTypes {
	// !!! Fix these types
	Login: any;
	'Sign Up': any;
	Main: any;
	Preview: any;
	Edit: any;
	Feedback: any;
	Camera: any;
}

export const Stack = createNativeStackNavigator<StackTypes>();
