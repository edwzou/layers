import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { View } from 'react-native';

import { ITEM_SIZE } from '../../utils/GapCalc';
import { ClothingTypes } from '../../constants/Enums';
import ItemCell from '../Cell/ItemCell'
import GlobalStyles from '../../constants/GlobalStyles';

import { bottomsData, outerwearData, outfitData, shoesData, topData } from './testData';
import OutfitCard from '../Card/OutfitCard';

type ClothingCategoryPropType = {
    category: string
}

export default function ClothingCategory({ category }: ClothingCategoryPropType) {
    const [data, setData] = useState<any>(); //!!! change any type

    useEffect(() => {
        switch (category) {
            case ClothingTypes.outfits: {
                setData(outfitData);
                break;
            }
            case ClothingTypes.outerwear: {
                setData(outerwearData);
                break;
            }
            case ClothingTypes.tops: {
                setData(topData);
                break;
            }
            case ClothingTypes.bottoms: {
                setData(bottomsData);
                break;
            }
            case ClothingTypes.shoes: {
                setData(shoesData);
                break;
            }
        }
    }, [category])

    return (
        <>
            {category === ClothingTypes.outfits ?
                <FlatList
                    data={data}
                    renderItem={({ item }) => <OutfitCard title={item.title} itemCount={item.items.length} items={item.items} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: GlobalStyles.layout.xGap }}
                /> :
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <View style={{ width: ITEM_SIZE(2) }}>
                            <ItemCell image={item.img} key={item.id} />
                        </View>
                    }
                    numColumns={2}
                    contentContainerStyle={{ gap: GlobalStyles.layout.xGap }}
                    columnWrapperStyle={{ gap: GlobalStyles.layout.xGap }}
                    showsVerticalScrollIndicator={false}
                />
            }
        </>
    );
}