import { StyleSheet, FlatList, Dimensions } from 'react-native';
import React from 'react';

import CategorySlide from './CategorySlide';

import { CategoryToIndex } from '../../constants/Enums';

import { UserClothing, UserAllItems } from '../../pages/Match';
import { UserOutfit } from '../../pages/OutfitView';

interface CategorySlidesPropsType {
	categorySlidesRef: any; /// !!! Fix any type
	allItemsData: UserAllItems[];
	selectedCategory: string;
	handleItemChange: (item: any) => void;
	handleViewableItemsChanged: ({ viewableItems }: any) => void;
}

const CategorySlides = ({
	categorySlidesRef,
	allItemsData,
	selectedCategory,
	handleItemChange,
	handleViewableItemsChanged,
}: CategorySlidesPropsType) => {
	const windowWidth = Dimensions.get('window').width;

	return (
		<FlatList
			ref={categorySlidesRef}
			data={allItemsData}
			renderItem={({ item }) => {
				// console.log('categoryslide: ', item);
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
			viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
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

const styles = StyleSheet.create({});

