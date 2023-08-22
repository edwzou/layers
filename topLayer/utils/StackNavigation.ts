import { RouteProp, ParamListBase } from '@react-navigation/native';
import {
	NativeStackNavigationEventMap,
	NativeStackNavigationOptions,
	createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { ReactNode } from 'react';

type StackNavigatorType = {
	id: string | undefined;
	initialRouteName: string | undefined;
	children: ReactNode;
	screenListeners: any;
	screenOptions: any;
};

export type StackTypes = {
	Login: StackNavigatorType;
	SignUp: StackNavigatorType;
	Main: StackNavigatorType;
	Preview: StackNavigatorType;
	ItemPreview: StackNavigatorType;
	EditClothing: StackNavigatorType;
	Feedback: StackNavigatorType;
	Camera: StackNavigatorType;
};

export const Stack = createNativeStackNavigator<StackTypes>();
