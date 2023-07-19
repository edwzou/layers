import { SafeAreaView, SectionList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ItemCell from '../../components/Cell/ItemCell'

import outerwear from "../../assets/img0.png"
import top from "../../assets/img1.png"
import pant from "../../assets/testPants1.png"
import shoe from "../../assets/img2.png"
import { ITEM_SIZE } from '../../utils/GapCalc'
import GlobalStyles from '../../constants/GlobalStyles'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { maxTranslateY, screenHeight } from '../../utils/modalMaxShow'
import ColorTag from '../../components/Tag/ColorTag'
import { TagAction } from '../../constants/Enums'
import { FlashList } from '@shopify/flash-list'
import { outfitData } from '../../constants/testData'
import BrandTag from '../../components/Tag/BrandTag'

const ViewOutfit = () => {
    return (
        <FlatList data={outfitData[0].items} numColumns={2}
            renderItem={({ item, index }) => {
                return <View style={{ flex: 1 / 2 }}>
                    <ItemCell image={item.image} disablePress />
                </View>
            }}
            style={styles.container}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<ItemCell image={outfitData[0].items[0].image} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: GlobalStyles.layout.xGap }}
            columnWrapperStyle={{ gap: GlobalStyles.layout.xGap }}
            ListFooterComponent={<View style={{ gap: 16 }}>
                <View style={styles.categoryContainer}>
                    <Text style={styles.subheader}>Colors</Text>
                    <View style={styles.tagsContainer}>
                        <ColorTag label='Beige' bgColor='#E8D3B4' action={TagAction.remove} onPress={() => { }} />
                        <ColorTag label='Red' bgColor='#E55A5A' action={TagAction.remove} onPress={() => { }} />
                        <ColorTag label='Olive' bgColor='#76956B' action={TagAction.remove} onPress={() => { }} />
                    </View>
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={styles.subheader}>Brands</Text>
                    <View style={styles.tagsContainer}>
                        <BrandTag label='Gap' onPress={() => { }} action={TagAction.remove} />
                        <BrandTag label='Nike' onPress={() => { }} action={TagAction.remove} />
                    </View>
                </View>
                {/* !!! Very hacky solution, try to fix this */}
                <View style={{ height: 100 }} />
            </View>}
        />
    )
}

export default ViewOutfit

const styles = StyleSheet.create({
    container: {
        marginHorizontal: GlobalStyles.layout.xGap,
        gap: GlobalStyles.layout.xGap,
        flex: 1,
    },
    items: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: GlobalStyles.layout.xGap,
        flex: 1
    },
    subheader: {
        ...GlobalStyles.typography.body
    },
    categoryContainer: {
        gap: 10
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 5
    }
})