import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { ClothingCategoryTypes, ClothingTypes } from '../../constants/Enums';

export default function CategoryBar({ handleTitlePress }: any) {
    const [selectedTitle, setSelectedTitle] = useState<ClothingCategoryTypes>(ClothingTypes.outfits);

    const handleTitlePressAndSetSelectedTitle = (title: ClothingCategoryTypes) => {
        handleTitlePress(title)
        setSelectedTitle(title)
    }

    const containerCell = (category: any) => {
        return <Pressable onPress={() => handleTitlePressAndSetSelectedTitle(category)} style={[styles.titleContainer, selectedTitle === category && styles.currentTitle]}>
            <Text style={[styles.title, selectedTitle === category && styles.currentTitleText]}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
        </Pressable>
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
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
        borderRadius: 100,
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
