import React, { useCallback, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import { UserClothing } from '.';

import ItemCell from '../../components/Cell/ItemCell';
import { screenWidth } from '../../utils/modalMaxShow';
import { ITEM_SIZE } from '../../utils/GapCalc';
import GlobalStyles from '../../constants/GlobalStyles';

const SNAP_ITEM_SIZE = ITEM_SIZE() * 1.25; // Cell gap
const SPACING = 0;
const EMPTY_ITEM_SIZE = (screenWidth - ITEM_SIZE()) / 2;
const CURRENT_ITEM_SCALE = 5; // Height of the Slider

type SliderPropsType = {
    data: (UserClothing | Record<string, number>)[] | null,
    selectedIndex: (category: string, index: number) => void,
}

const Selector = ({ data, selectedIndex }: SliderPropsType) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const currentIndex = useRef<number>(0);
    const flatListRef = useRef<FlatList<any>>(null);


    const handleOnViewableItemsChanged = useCallback(({ viewableItems }: any) => {
        const itemsInView = viewableItems.filter(
            ({ item }: any) => item.image && item.category,
        );

        if (itemsInView.length === 0) {
            return;
        }

        currentIndex.current = itemsInView[0].index;

        const rawItemIndex = currentIndex.current - 1
        const category = itemsInView[0].item.category;

        selectedIndex(category, rawItemIndex)
    }, []);

    const getItemLayout = (_: any, index: number) => ({
        length: SNAP_ITEM_SIZE,
        offset: SNAP_ITEM_SIZE * (index - 1),
        index,
    });

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={data}
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
                        outputRange: [0.85, 1.15, 0.85], // Scaling of slider
                        extrapolate: 'clamp',
                    });

                    return (
                        <View style={{ width: SNAP_ITEM_SIZE }}>
                            <Animated.View
                                style={[
                                    { transform: [{ scale: scale }] },
                                    styles.itemContent
                                ]}>
                                <ItemCell image={item.image} disablePress />
                            </Animated.View>
                        </View>
                    );
                }}
                getItemLayout={getItemLayout}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={data => data.id}
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
    },
    itemContent: {
        marginHorizontal: SPACING,
        alignItems: 'center',
        backgroundColor: GlobalStyles.colorPalette.primary[200],
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: ITEM_SIZE(),
        aspectRatio: 1 / 1,
        borderRadius: GlobalStyles.utils.mediumRadius.borderRadius,
    },
});