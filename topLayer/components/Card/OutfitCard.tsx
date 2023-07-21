import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import ItemCell from '../Cell/ItemCell'
import { screenWidth } from '../../utils/modalMaxShow';
import { ITEM_SIZE } from '../../utils/GapCalc';
import { UserClothing } from '../../pages/Match';

const itemCellSize = (screenWidth - 60) / 4;

type OutfitCardPropsType = {
    title: string;
    itemCount: number,
    items: UserClothing[],
    onPress: () => void,
};

export default function OutfitCard({
    title,
    itemCount,
    items,
    onPress
}: OutfitCardPropsType) {
    const truncatedTitle = title.length > 70 ? title.slice(0, 70) + "..." : title;
    return (
        <Pressable style={styles.container}
            onPress={onPress}>
            <View style={{ height: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text style={styles.title}>{truncatedTitle}</Text>
                <Text>
                    <View style={[styles.label, GlobalStyles.utils.tagShadow]}>
                        <Text style={styles.labelText}>{itemCount} items</Text>
                    </View>
                </Text>
            </View>
            <FlatList
                data={items.slice(0, 4)}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <ItemCell image={item.image} disablePress={true} imageStyle={{ width: '85%', height: '85%' }} />
                    </View>
                )}
                numColumns={2}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        aspectRatio: 1.8,
        borderRadius: GlobalStyles.utils.mediumRadius.borderRadius,
        backgroundColor: GlobalStyles.colorPalette.card[100],
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        ...GlobalStyles.typography.body,
        width: screenWidth - ((itemCellSize * 2) + (10 * 9)),
    },
    label: {
        backgroundColor: GlobalStyles.colorPalette.primary[500],
        borderRadius: 100,
        paddingVertical: 4,
        paddingHorizontal: 10,
        shadowColor: GlobalStyles.colorPalette.primary[500],
    },
    labelText: {
        color: GlobalStyles.colorPalette.background,
        ...GlobalStyles.typography.body
    },
    itemContainer: {
        width: ITEM_SIZE(4.5),
        margin: 5,
    },
});
