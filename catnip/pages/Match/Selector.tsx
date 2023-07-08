import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ITEM_SIZE } from '../../utils/GapCalc';
import GlobalStyles from '../../constants/GlobalStyles';
import ItemCell from '../../components/Cell/ItemCell';

const { width } = Dimensions.get('window');

const SNAP_ITEM_SIZE = ITEM_SIZE * 1.35;
const SPACING = 1;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const CURRENT_ITEM_SCALE = 20;

type SelectorPropsType = {
    outerwear: unknown[],
    tops: unknown[],
    bottoms: unknown[],
    shoes: unknown[]
}

const Selector = ({ outerwear, tops, bottoms, shoes }: SelectorPropsType) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [outerwearWithPlaceholders, setOuterwearWithPlaceholders] = useState([])
    const [topsWithPlaceholders, setTopsWithPlaceholders] = useState([])
    const [bottomsWithPlaceholders, setBottomsWithPlaceholders] = useState([])
    const [shoesWithPlaceholders, setShoesWithPlaceholders] = useState([])
    const currentIndex = useRef<number>(0);
    const flatListRef = useRef<FlatList<any>>(null);

    // const [dataWithPlaceholders, setDataWithPlaceholders] = useState<any>({
    //     outerwear: [],
    //     tops: [],
    //     shoes: [],
    //     bottoms: [],
    // });

    // useEffect(() => {
    //     if (outerwear.length > 0) { console.log('outerwear'); setDataWithPlaceholders({ ...dataWithPlaceholders, outerwear: [{ id: -1 }, ...outerwear, { id: outerwear.length }] }); }
    //     if (tops.length > 0) { console.log('tops'); setDataWithPlaceholders({ ...dataWithPlaceholders, tops: [{ id: -1 }, ...tops, { id: tops.length }] }); }
    //     if (bottoms.length > 0) { console.log('bottom'); setDataWithPlaceholders({ ...dataWithPlaceholders, bottoms: [{ id: -1 }, ...bottoms, { id: bottoms.length }] }); }
    //     if (shoes.length > 0) { console.log('shoes'); setDataWithPlaceholders({ ...dataWithPlaceholders, shoes: [{ id: -1 }, ...shoes, { id: shoes.length }] }); }
    //     currentIndex.current = 1;
    // }, [outerwear, tops, bottoms, shoes]);

    useEffect(() => {
        if (outerwear.length > 0) setOuterwearWithPlaceholders([{ id: -1 }, ...outerwear, { id: outerwear.length }])
        if (tops.length > 0) setTopsWithPlaceholders([{ id: -1 }, ...tops, { id: tops.length }])
        if (bottoms.length > 0) setBottomsWithPlaceholders([{ id: -1 }, ...bottoms, { id: bottoms.length }])
        if (shoes.length > 0) setShoesWithPlaceholders([{ id: -1 }, ...shoes, { id: shoes.length }])
        currentIndex.current = 1;
    }, [outerwear, tops, bottoms, shoes])

    const handleOnViewableItemsChanged = useCallback(
        ({ viewableItems }: any) => {
            const itemsInView = viewableItems.filter(
                ({ item }: any) => item.uri && item.title,
            );

            if (itemsInView.length === 0) {
                return;
            }

            currentIndex.current = itemsInView[0].index;

            const rawItemIndex = currentIndex.current - 1 // Use this for to pick the element
        },
        [outerwear, tops, bottoms, shoes],
    );

    // `data` parameter is not used. Therefore, it is annotated with the `any` type to merely satisfy the linter.
    const getItemLayout = (_data: any, index: number) => ({
        length: SNAP_ITEM_SIZE,
        offset: SNAP_ITEM_SIZE * (index - 1),
        index,
    });

    // console.log(dataWithPlaceholders)

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={outerwearWithPlaceholders}
                renderItem={({ item, index }) => {
                    if (!item.image || !item.category) {
                        return <View style={{ width: EMPTY_ITEM_SIZE }} />;
                    }

                    const inputRange = [
                        (index - 2) * SNAP_ITEM_SIZE,
                        (index - 1) * SNAP_ITEM_SIZE,
                        index * SNAP_ITEM_SIZE,
                    ];

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [1, 1.45, 1],
                        extrapolate: 'clamp',
                    });

                    return (
                        <View style={{ width: SNAP_ITEM_SIZE }}>
                            <Animated.View
                                style={[
                                    { transform: [{ scale: scale }] },
                                    styles.itemContent
                                ]}>
                                <ItemCell image={item.image} size={ITEM_SIZE} />
                            </Animated.View>
                        </View>
                    );
                }}
                getItemLayout={getItemLayout}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                bounces={false}
                decelerationRate={0}
                renderToHardwareTextureAndroid
                contentContainerStyle={styles.flatListContent}
                snapToInterval={SNAP_ITEM_SIZE}
                snapToAlignment="start"
                onScroll={
                    Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false },
                    )
                }
                scrollEventThrottle={16}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 100,
                }}
            />
        </View >
    );
};

export default Selector;

const styles = StyleSheet.create({
    flatListContent: {
        height: CURRENT_ITEM_SCALE * 2 + SNAP_ITEM_SIZE,
        alignItems: 'center',
        marginBottom: CURRENT_ITEM_SCALE,
    },
    itemContent: {
        marginHorizontal: SPACING * 3,
        alignItems: 'center',
        backgroundColor: GlobalStyles.colorPalette.primary[200],
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: ITEM_SIZE,
        aspectRatio: 1 / 1,
        borderRadius: 20,
    },
});