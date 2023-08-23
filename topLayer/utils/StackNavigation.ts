import { RouteProp, ParamListBase } from '@react-navigation/native';
import {
	NativeStackNavigationEventMap,
	NativeStackNavigationOptions,
	createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { ReactNode } from 'react';

export type StackNavigatorType = {
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
	Profile: StackNavigatorType;
	Preview: StackNavigatorType;
	Match: StackNavigatorType;
	ItemView: StackNavigatorType;
	EditClothing: StackNavigatorType;
	OutfitView: StackNavigatorType;
	Feedback: StackNavigatorType;
	Find: StackNavigatorType;
	Camera: StackNavigatorType;
	Settings: StackNavigatorType;
	MarkedList: StackNavigatorType;
	OutfitPreview: StackNavigatorType;
};

export const Stack = createNativeStackNavigator<StackTypes>();
