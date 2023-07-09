import React from 'react'
import { View, Dimensions } from 'react-native';
import ItemCell from '../Cell/ItemCell'
import img1 from '../../assets/testImg.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';
import { FlatList } from 'react-native-gesture-handler';
import GlobalStyles from '../../constants/GlobalStyles';
import { ITEM_SIZE } from '../../utils/GapCalc';

const testData = [
    {
        id: 'img3',
        img: img3,
        title: 'pant',
    },
    {
        id: 'img4',
        img: img3,
        title: 'pant',
    },
    {
        id: 'img5',
        img: img3,
        title: 'pant',
    },
    {
        id: 'img6',
        img: img3,
        title: 'pant',
    },
    {
        id: 'img7',
        img: img3,
        title: 'pant',
    },
    {
        id: 'img3',
        img: img3,
        title: 'pant',
    },
    {
        id: 'img4',
        img: img3,
        title: 'pant',
    },
    {
        id: 'img5',
        img: img3,
        title: 'pant',
    },
];

export default function BottomsCategory() {
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