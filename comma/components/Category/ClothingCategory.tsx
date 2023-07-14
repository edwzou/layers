import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { View } from 'react-native';

import { ITEM_SIZE } from '../../utils/GapCalc';
import { ClothingTypes } from '../../constants/Enums';
import ItemCell from '../Cell/ItemCell'
import GlobalStyles from '../../constants/GlobalStyles';

import { bottomsData, outerwearData, outfitData, shoesData, topData } from './testData';
import OutfitCard from '../Card/OutfitCard';
import { screenHeight } from '../../utils/modalMaxShow';

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
        // !!! Better solution is needed for the height
        <View style={{ height: screenHeight / 1.75 }}>
            {category === ClothingTypes.outfits ?
                <FlatList
                    data={data}
                    renderItem={({ item }) => <OutfitCard title={item.title} itemCount={item.items.length} items={item.items} />}
                    showsVerticalScrollIndicator={false}

                /> : <FlatList
                    data={data}
                    renderItem={({ item }) => <ItemCell image={item.img} size={ITEM_SIZE()} />}
                    numColumns={2}
                    contentContainerStyle={{ gap: GlobalStyles.layout.xGap, paddingBottom: ITEM_SIZE() }}
                    columnWrapperStyle={{ gap: GlobalStyles.layout.xGap }}
                    showsVerticalScrollIndicator={false}
                />}
        </View>
    );
}