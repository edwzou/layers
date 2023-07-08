import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header/Header'
import { stepOverTypes } from '../../utils/Stepover'
import GlobalStyles from '../../constants/GlobalStyles'
import Selector from './Selector'

import top1 from "../../assets/testImg.png"
import pant1 from "../../assets/img3.png"
import shoe3 from "../../assets/img2.png"

const Match = () => {
    const data = [
        {
            id: 0,
            image: top1,
            category: "Tops",
        },
        {
            id: 1,
            image: pant1,
            category: "Bottoms",
        },
        {
            id: 2,
            image: shoe3,
            category: "Shoes",
        },
    ];
    return (
        <View style={styles.container}>
            <Header text='Match' back={false} stepOver={{ type: stepOverTypes.next, url: '/' }} />
            <Selector outerwear={data} tops={data} bottoms={data} shoes={data} />
        </View>
    )
}

export default Match

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})