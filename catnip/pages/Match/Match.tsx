import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import { StepOverTypes, ClothingTypes, StackNavigation } from '../../constants/Enums'
import Selector from './Selector'
import Button from '../../components/Button/Button'

import top1 from "../../assets/testImg.png"
import pant1 from "../../assets/img3.png"
import shoe3 from "../../assets/img2.png"

const Match = () => {
    const data = [
        [{
            id: 0,
            image: top1,
            category: ClothingTypes.tops,
        },
        {
            id: 1,
            image: top1,
            category: ClothingTypes.tops,
        },
        {
            id: 2,
            image: top1,
            category: ClothingTypes.tops,
        }], [{
            id: 0,
            image: pant1,
            category: ClothingTypes.bottoms,
        },
        {
            id: 1,
            image: pant1,
            category: ClothingTypes.bottoms,
        },
        {
            id: 2,
            image: pant1,
            category: ClothingTypes.bottoms,
        }],
        [{
            id: 0,
            image: shoe3,
            category: ClothingTypes.shoes,
        },
        {
            id: 1,
            image: shoe3,
            category: ClothingTypes.shoes,
        },
        {
            id: 2,
            image: shoe3,
            category: ClothingTypes.shoes,
        }],
    ];

    const [selectedIndexes, setSelectedIndexes] = useState({
        outerwear: null,
        tops: null,
        bottoms: null,
        shoes: null
    });

    const selectedIndex = (category: string, index: any) => {
        if (category === ClothingTypes.outerwear) setSelectedIndexes(placeholderData => ({ ...placeholderData, outerwear: index }));
        if (category === ClothingTypes.tops) setSelectedIndexes(placeholderData => ({ ...placeholderData, tops: index }));
        if (category === ClothingTypes.bottoms) setSelectedIndexes(placeholderData => ({ ...placeholderData, bottoms: index }));
        if (category === ClothingTypes.shoes) setSelectedIndexes(placeholderData => ({ ...placeholderData, shoes: index }));
    }

    const handlePress = () => {
        console.log(selectedIndexes)
    }

    return (
        <View style={styles.container}>
            <Header text={StackNavigation.Match} back={false} stepOver={{ type: StepOverTypes.next, handlePress }} />
            <Selector outerwear={[]} tops={data[0]} bottoms={data[1]} shoes={data[2]} selectedIndex={selectedIndex} />
            <Button text='Preview' onPress={handlePress} style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }} />
        </View>
    )
}

export default Match

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})