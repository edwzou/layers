import React from 'react';
import { Text, StyleSheet, ScrollView, Pressable } from 'react-native';

import GlobalStyles from '../../constants/GlobalStyles';
import { ClothingTypes } from '../../constants/Enums';

interface CategoryBarPropsType {
    selectedCategory: string,
    handleCategoryChange: (category: string) => void;
}

export default function CategoryBar({ selectedCategory, handleCategoryChange }: CategoryBarPropsType) {

    const handleCategoryPress = (category: string) => {
        handleCategoryChange(category);
    };

    const containerCell = (category: any) => {
        return (
            <Pressable
                onPress={() => {
                    handleCategoryPress(category);
                }}
                style={[
                    styles.titleContainer,
                    selectedCategory === category && styles.currentTitle,
                ]}
            >
                <Text
                    style={[
                        styles.title,
                        selectedCategory === category && styles.currentTitleText,
                    ]}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
            </Pressable>
        );
    };

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 16 }}
        >
            {containerCell(ClothingTypes.outfits)}
            {containerCell(ClothingTypes.outerwear)}
            {containerCell(ClothingTypes.tops)}
            {containerCell(ClothingTypes.bottoms)}
            {containerCell(ClothingTypes.shoes)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        paddingHorizontal: 15,
    },
    title: {
        ...GlobalStyles.typography.body,
        color: GlobalStyles.colorPalette.primary[300],
    },
    currentTitle: {
        backgroundColor: GlobalStyles.colorPalette.primary[500],
        ...GlobalStyles.utils.fullRadius,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        paddingVertical: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    currentTitleText: {
        color: GlobalStyles.colorPalette.background,
    },
});


