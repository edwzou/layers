import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../utils/StackNavigation';

type BasicNavigationProp = NativeStackNavigationProp<StackTypes>;

export type NavigationProp = {
	navigation: BasicNavigationProp;
};
