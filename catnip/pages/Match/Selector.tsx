import React, { useEffect, useState } from 'react';
import Slider from './Slider';
import { UserClothing, UserClothingList } from '.';
import { ScrollView } from 'react-native-gesture-handler';

type SelectorPropsType = {
    outerwear: UserClothing[],
    tops: UserClothing[],
    bottoms: UserClothing[],
    shoes: UserClothing[],
    selectedIndex: (category: string, index: number) => void,
}

const Selector = ({ outerwear, tops, bottoms, shoes, selectedIndex }: SelectorPropsType) => {
    const [dataWithPlaceholders, setDataWithPlaceholders] = useState<UserClothingList>({
        outerwear: [],
        tops: [],
        bottoms: [],
        shoes: [],
    });

    const padding: UserClothing = { id: -1 };

    useEffect(() => {
        if (outerwear.length > 0) setDataWithPlaceholders(placeholderData => ({ ...placeholderData, outerwear: [padding, ...outerwear, { id: outerwear.length }] }));
        if (tops.length > 0) setDataWithPlaceholders(placeholderData => ({ ...placeholderData, tops: [padding, ...tops, { id: tops.length }] }));
        if (bottoms.length > 0) setDataWithPlaceholders(placeholderData => ({ ...placeholderData, bottoms: [padding, ...bottoms, { id: bottoms.length }] }));
        if (shoes.length > 0) setDataWithPlaceholders(placeholderData => ({ ...placeholderData, shoes: [padding, ...shoes, { id: shoes.length }] }));
    }, [outerwear, tops, bottoms, shoes]);

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
            {outerwear.length > 0 ? <Slider data={dataWithPlaceholders.outerwear} selectedIndex={selectedIndex} /> : null}
            {tops.length > 0 ? <Slider data={dataWithPlaceholders.tops} selectedIndex={selectedIndex} /> : null}
            {bottoms.length > 0 ? <Slider data={dataWithPlaceholders.bottoms} selectedIndex={selectedIndex} /> : null}
            {shoes.length > 0 ? <Slider data={dataWithPlaceholders.shoes} selectedIndex={selectedIndex} /> : null}
        </ScrollView>
    );
};

export default Selector;