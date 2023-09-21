import {
	createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { UserClothing } from '../pages/Match';
import { UserOutfit } from '../pages/OutfitView';

import { User } from '../pages/Main';

export type StackNavigatorType = {
	user?: User;
	item?: UserClothing | UserOutfit;
	editable?: boolean;
	matchItems?: {
		outerwear?: UserClothing,
		tops?: UserClothing,
		bottoms?: UserClothing,
		shoes?: UserClothing,
	}
	matchName?: (text: string) => void;
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
	ForeignProfile: StackNavigatorType;
};

export const Stack = createNativeStackNavigator<StackTypes>();
