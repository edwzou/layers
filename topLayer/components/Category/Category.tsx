import { type FlatList, View, type ViewToken } from 'react-native';
import CategoryBar from './CategoryBar';
import CategorySlides from './CategorySlides';
import { type UserAllItems } from '../../types/AllItems';
import React, { type ReactElement, type RefObject } from 'react';
import { type UserClothing } from '../../types/Clothing';
import { type UserOutfit } from '../../types/Outfit';

interface CategoryComponentProps {
	allItems: UserAllItems[];
	selectedCategory: string;
	flatListRef: RefObject<FlatList<UserAllItems>>;
	handleCategoryChange: (category: string) => void;
	handleItemChange: (item: UserClothing | UserOutfit) => void;
	handleViewableItemsChanged: ({
		viewableItems,
	}: {
		viewableItems: ViewToken[];
	}) => void;
}

const CategoryComponent = ({
	allItems,
	selectedCategory,
	flatListRef,
	handleCategoryChange,
	handleItemChange,
	handleViewableItemsChanged,
}: CategoryComponentProps): ReactElement => {
	return (
		<View style={{ top: 5 }}>
			<CategoryBar
				selectedCategory={selectedCategory}
				handleCategoryChange={handleCategoryChange}
			/>
			<CategorySlides
				categorySlidesRef={flatListRef}
				allItemsData={allItems}
				selectedCategory={selectedCategory}
				handleItemChange={handleItemChange}
				handleViewableItemsChanged={handleViewableItemsChanged}
			/>
		</View>
	);
};

export default CategoryComponent;
