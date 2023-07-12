import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, FlatList } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import ItemCell from '../Cell/ItemCell'

const itemCellSize = (Dimensions.get('window').width - 60) / 4;

type OutfitCardPropsType = {
    title: string;
    itemCount: number,
    items: any[],
};

export default function OutfitCard({
    title,
    itemCount,
    items,
}: OutfitCardPropsType) {
    const truncatedTitle = title.length > 70 ? title.slice(0, 70) + "..." : title;
    return (
        <Pressable style={styles.container}
            onPress={() => {
                console.log('OutfitCard tapped');
            }}>
            <Text style={styles.title}>{truncatedTitle}</Text>
            <View style={styles.labelContainer}>
                <View style={styles.label}>
                    <Text style={styles.labelText}>{itemCount} items</Text>
                </View>
            </View>
            <View style={styles.itemGrid}>
                <FlatList
                    data={items.slice(0, 4)}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <ItemCell image={item.img} size={itemCellSize} disablePress={true} imageStyle={{ width: '85%', height: '85%' }} />
                        </View>
                    )}
                    numColumns={2}
                />

            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 1.8,
        borderRadius: 20,
        backgroundColor: GlobalStyles.colorPalette.card[100],
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 13,
    },
    title: {
        ...GlobalStyles.typography.body,
        position: 'absolute',
        top: 27,
        left: 20,
        width: Dimensions.get('window').width - ((itemCellSize * 2) + (10 * 9))
    },
    labelContainer: {
        position: 'absolute',
        bottom: 15,
        left: 20,
    },
    label: {
        backgroundColor: 'black',
        borderRadius: 100,
        paddingVertical: 4,
        paddingHorizontal: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    labelText: {
        color: 'white',
        ...GlobalStyles.typography.body
    },
    itemGrid: {
        position: 'absolute',
        top: 'auto',
        right: 10,
        bottom: 'auto',
    },
    itemContainer: {
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
});
