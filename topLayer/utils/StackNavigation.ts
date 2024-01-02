import {
	createNativeStackNavigator,
	type NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { type UserClothing } from '../pages/Match';
import { type UserOutfit } from '../pages/OutfitView';

import { type markedUser } from '../pages/Main/UserTypes';

// DO NOT ADD ANY FUNCTIONS UNDER StackNavigatorType
export interface StackNavigatorType {
	userID?: string;
	markedUser?: markedUser;
	item?: UserClothing | UserOutfit;
	editable?: boolean;
	matchItems?: {
		outerwear?: UserClothing;
		tops?: UserClothing;
		bottoms?: UserClothing;
		shoes?: UserClothing;
	};
	returnTo?: NativeStackNavigationProp<StackTypes>;
	returnToPfp?: boolean;
}

export interface StackTypes {
	[key: string]: StackNavigatorType;
	Login: StackNavigatorType;
	SignUp: StackNavigatorType;
	Main: StackNavigatorType;
	Profile: StackNavigatorType;
	Preview: StackNavigatorType;
	Match: StackNavigatorType;
	ItemView: StackNavigatorType;
	ItemCreate: StackNavigatorType;
	ItemEdit: StackNavigatorType;
	OutfitView: StackNavigatorType;
	OutfitEdit: StackNavigatorType;
	Feedback: StackNavigatorType;
	Find: StackNavigatorType;
	CameraWrapper: StackNavigatorType;
	CameraComponents: StackNavigatorType;
	Settings: StackNavigatorType;
	MarkedList: StackNavigatorType;
	OutfitPreview: StackNavigatorType;
	ForeignProfile: StackNavigatorType;
}

export const Stack = createNativeStackNavigator<StackTypes>();
