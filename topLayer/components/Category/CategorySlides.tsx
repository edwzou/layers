import { StyleSheet, FlatList, Dimensions } from 'react-native'
import React, { useContext } from 'react'

import CategorySlide from './CategorySlide';

import { CategoryToIndex } from '../../constants/Enums';

interface CategorySlidesPropsType {
    categorySlidesRef: any; /// !!! Fix any type
    clothingData: any; /// !!! Fix any type
    selectedCategory: string;
    handleItemChange: (item: any) => void;
    handleViewableItemsChanged: ({ viewableItems }: any) => void;
}

const CategorySlides = ({ categorySlidesRef, clothingData, selectedCategory, handleItemChange, handleViewableItemsChanged }: CategorySlidesPropsType) => {

    const windowWidth = Dimensions.get('window').width;

    return (
        <FlatList
            ref={categorySlidesRef}
            data={clothingData}
            renderItem={({ item }) => (
                <CategorySlide
                    clothingData={item}
                    handleItemChange={handleItemChange}
                />
            )}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={handleViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
            initialScrollIndex={CategoryToIndex[selectedCategory]}
            getItemLayout={(data, index) => (
                { length: windowWidth, offset: windowWidth * index, index }
            )}
        />

    )
}

export default CategorySlides

const styles = StyleSheet.create({})