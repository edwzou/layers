import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ItemCell from '../../components/Cell/ItemCell';

import GlobalStyles from '../../constants/GlobalStyles';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ColorTag from '../../components/Tag/ColorTag';
import { TagAction, ColorTags } from '../../constants/Enums';
import { topData } from '../../constants/testData';
import BrandTag from '../../components/Tag/BrandTag';

const OutfitView = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={{ flex: 1 }}>
                <ItemCell image={topData[0].image} disablePress />
            </View>
            <View style={{ gap: 20, top: 20, }}>
                <View style={[styles.categoryContainer]}>
                    <Text style={styles.subheader}>Colors</Text>
                    <View style={styles.tagsContainer}>
                        <ColorTag
                            action={TagAction.static}
                            color={ColorTags.Red}
                        />
                        <ColorTag
                            action={TagAction.static}
                            color={ColorTags.Orange}
                        />
                        <ColorTag
                            action={TagAction.static}
                            color={ColorTags.Yellow}
                        />
                    </View>
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={styles.subheader}>Brands</Text>
                    <View style={styles.tagsContainer}>
                        <BrandTag
                            action={TagAction.static}
                            label="Gap"
                        />
                        <BrandTag
                            action={TagAction.static}
                            label="Nike"
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default OutfitView;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: GlobalStyles.layout.xGap,
        gap: GlobalStyles.layout.gap,
        flex: 1,
    },
    items: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: GlobalStyles.layout.gap,
        flex: 1,
    },
    subheader: {
        ...GlobalStyles.typography.body,
    },
    categoryContainer: {
        gap: 10,
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
});
