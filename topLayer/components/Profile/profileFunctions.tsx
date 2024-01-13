import { type UserAllItems } from '@/types/AllItems';
import { type UserClothing } from '@/types/Clothing';
import { type UserOutfit } from '@/types/Outfit';
import { CategoryToIndex, StackNavigation } from '../../constants/Enums';
import { type Dispatch, type RefObject, type SetStateAction } from 'react';
import { type FlatList } from 'react-native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';

export const handleIndexChange = (
	index: number,
	flatListRef: RefObject<FlatList<UserAllItems>>
): void => {
	if (flatListRef.current != null) {
		flatListRef.current?.scrollToIndex({ index, animated: false });
	}
};

export const handleCategoryChange = (
	category: string,
	flatListRef: RefObject<FlatList<UserAllItems>>,
	setSelectedCategory: Dispatch<SetStateAction<string>>
): void => {
	setSelectedCategory(category);
	handleIndexChange(CategoryToIndex[category], flatListRef);
};

export const handleItemChange = (
	item: UserClothing | UserOutfit,
	navigation: NativeStackNavigationProp<StackTypes>,
	editable: boolean
): void => {
	if ('oid' in item) {
		navigation.navigate(StackNavigation.OutfitView, {
			item: item,
			editable: editable,
		});
	} else {
		navigation.navigate(StackNavigation.ItemView, {
			item: item,
			editable: editable,
		});
	}
};
