import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { UserClothing } from '../pages/Match';
import { UserOutfit } from '../pages/OutfitView';

import { markedUser, User } from '../pages/Main';

// DO NOT ADD ANY FUNCTIONS UNDER StackNavigatorType
export type StackNavigatorType = {
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
	setMarked?: () => void; // REMOVE THIS
};

export type StackTypes = {
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
};

export const Stack = createNativeStackNavigator<StackTypes>();
