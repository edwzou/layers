import { StyleSheet, FlatList, Dimensions } from 'react-native'
import React from 'react'

import CategorySlide from './CategorySlide';

import { CategoryToIndex } from '../../constants/Enums';

import { UserClothing } from '../../pages/Match';
import { UserOutfit } from '../../pages/OutfitView';

interface CategorySlidesPropsType {
    categorySlidesRef: any; /// !!! Fix any type
    allOutfitsData: UserOutfit[];
    allOuterwearData: UserClothing[];
    allTopsData: UserClothing[];
    allBottomsData: UserClothing[];
    allShoesData: UserClothing[];
    selectedCategory: string;
    handleItemChange: (item: any) => void;
    handleViewableItemsChanged: ({ viewableItems }: any) => void;
}

const CategorySlides = ({ categorySlidesRef, allOutfitsData, allOuterwearData, allTopsData, allBottomsData, allShoesData, selectedCategory, handleItemChange, handleViewableItemsChanged }: CategorySlidesPropsType) => {

    const windowWidth = Dimensions.get('window').width;

    console.log(allOutfitsData)
    console.log(allOuterwearData)
    console.log(allTopsData)
    console.log(allBottomsData)
    console.log(allShoesData)

    return (
        <FlatList
            ref={categorySlidesRef}
            data={[allOutfitsData, allOuterwearData, allTopsData, allBottomsData, allShoesData]}
            renderItem={({ item }) => {
                //console.log(item)
                return (
                    <CategorySlide
                        itemsData={item}
                        handleItemChange={handleItemChange}
                    />
                )
            }}
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