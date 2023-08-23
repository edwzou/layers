import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import ItemCell from '../../components/Cell/ItemCell';

import GlobalStyles from '../../constants/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { TagAction } from '../../constants/Enums';

import { ColorTagsContext } from '../../pages/Profile/Profile';
import ColorTagsList from '../../components/ColorManager/ColorTagsList';
import { UserClothing } from 'pages/Match';

interface ItemViewPropsType {
    clothingItem: UserClothing;
}

const ItemView = ({ clothingItem }: ItemViewPropsType) => {
    const colorTags = useContext(ColorTagsContext)
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ flex: 1 }}>

                    <ItemCell image={clothingItem.image} disablePress />
                </View>
                <Text style={styles.subheader}>Colors</Text>
            </ View>
            <View style={{ marginTop: -10 }}>
                <ColorTagsList data={clothingItem.colors} tagAction={TagAction.static} />
                {/* <View style={styles.categoryContainer}>
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
                </View> */}
            </View>
        </ScrollView>
    );
};

export default ItemView;

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
