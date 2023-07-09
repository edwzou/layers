import React from 'react'
import { View, Dimensions } from 'react-native';
import ItemCell from '../Cell/ItemCell'
import img2 from '../../assets/img2.png';
import { FlatList } from 'react-native-gesture-handler';
import GlobalStyles from '../../constants/GlobalStyles';
import { ITEM_SIZE } from '../../utils/GapCalc';

const testData = [
    {
        id: 'img2',
        img: img2,
        title: 'shoe',
    },
];

export default function FootwearCategory() {
    return (
        <View style={{ width: (ITEM_SIZE * 2) + GlobalStyles.layout.xGap, height: '100%' }}>
            <FlatList
                data={testData}
                renderItem={({ item }) => <ItemCell image={item.img} size={ITEM_SIZE} disablePress={false} />}
                numColumns={2}
                contentContainerStyle={{ gap: GlobalStyles.layout.xGap, paddingBottom: ITEM_SIZE }}
                columnWrapperStyle={{ gap: GlobalStyles.layout.xGap }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}