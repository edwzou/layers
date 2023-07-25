import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import ItemCell from '../../components/Cell/ItemCell';
import GlobalStyles from '../../constants/GlobalStyles';
import StackedTextbox from '../../components/Textbox/StackedTextbox';

import { ITEM_SIZE } from '../../utils/GapCalc';
import { screenHeight } from '../../utils/modalMaxShow';
import { UserOutfit } from '.';
import { outfitData } from '../../constants/testData';

// type OutfitPreviewPropsType = {
//     outerwear: UserOutfit,
//     tops: UserOutfit,
//     bottoms: UserOutfit,
//     shoes: UserOutfit,
//     matchName: (text: string) => void;
// }

const OutfitEdit = () => {
    const [text, setText] = useState('');
    const [rawData, setRawData] = useState<UserOutfit[]>([]);
    const [data, setData] = useState<UserOutfit[]>([]);
    const onInputChange = (text: string) => {
        setText(text);
        // matchName(text);
    };

    // useEffect(() => {
    //     setRawData([outerwear, tops, bottoms, shoes])
    // }, [outerwear, tops, bottoms, shoes])

    useEffect(() => {
        setData(rawData.filter(Boolean))
    }, [rawData])

    return (
        <View style={styles.container}>
            <StackedTextbox
                label="Outfit name"
                onFieldChange={onInputChange}
                value={text}
            />
            <FlatList
                data={outfitData[0].items}
                renderItem={({ item }) => {
                    return <View style={{ width: ITEM_SIZE(2) }}>
                        <ItemCell image={item.image} disablePress={false} key={item.id} />
                    </View>
                }}
                numColumns={2}
                contentContainerStyle={{ gap: GlobalStyles.layout.gap }}
                columnWrapperStyle={{ gap: GlobalStyles.layout.gap }}
                style={{ height: screenHeight - 350 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: GlobalStyles.layout.xGap,
        gap: GlobalStyles.layout.gap,
    },
});

export default OutfitEdit;
