import React from 'react'
import { View } from 'react-native';
import ItemCell from '../Cell/ItemCell'
import img0 from '../../assets/img0.png';
import { FlatList } from 'react-native-gesture-handler';
import GlobalStyles from '../../constants/GlobalStyles';
import { ITEM_SIZE } from '../../utils/GapCalc';

const testData = [
    {
        id: 'img0',
        img: img0,
        title: 'burberry',
    },
    {
        id: 'img0',
        img: img0,
        title: 'burberry',
    },
    {
        id: 'img0',
        img: img0,
        title: 'burberry',
    },
];

export default function OuterwearCategory() {
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