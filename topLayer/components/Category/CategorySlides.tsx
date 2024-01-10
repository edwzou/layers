import { FlatList, Dimensions, type ViewToken } from 'react-native';
import React, { type RefObject, type ReactElement } from 'react';
import CategorySlide from './CategorySlide';
import { CategoryToIndex } from '../../constants/Enums';
import { type UserAllItems } from '../../types/AllItems';
import { type UserClothing } from 'types/Clothing';
import { type UserOutfit } from 'types/Outfit';

interface CategorySlidesPropsType {
	categorySlidesRef: RefObject<FlatList<UserAllItems>>;
	allItemsData: UserAllItems[];
	selectedCategory: string;
	handleItemChange: (item: UserClothing | UserOutfit) => void;
	handleViewableItemsChanged: ({
		viewableItems,
	}: {
		viewableItems: ViewToken[];
	}) => void;
}

const CategorySlides = ({
	categorySlidesRef,
	allItemsData,
	selectedCategory,
	handleItemChange,
	handleViewableItemsChanged,
}: CategorySlidesPropsType): ReactElement => {
	const windowWidth = Dimensions.get('window').width;

	return (
		<FlatList
			ref={categorySlidesRef}
			data={allItemsData}
			renderItem={({ item }) => {
				return (
					<CategorySlide itemsData={item} handleItemChange={handleItemChange} />
				);
			}}
			keyExtractor={(item) => {
				return item.category;
			}}
			horizontal
			pagingEnabled
			snapToAlignment="center"
			showsHorizontalScrollIndicator={false}
			onViewableItemsChanged={handleViewableItemsChanged}
			viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
			initialScrollIndex={CategoryToIndex[selectedCategory]}
			getItemLayout={(data, index) => ({
				length: windowWidth,
				offset: windowWidth * index,
				index,
			})}
		/>
	);
};

export default CategorySlides;
