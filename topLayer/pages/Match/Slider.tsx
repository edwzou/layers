import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import { type UserClothing } from '.';

import ItemCell from '../../components/Cell/ItemCell';
import { screenWidth } from '../../utils/modalMaxShow';
import { ITEM_SIZE } from '../../utils/GapCalc';
import GlobalStyles from '../../constants/GlobalStyles';

import Icon from 'react-native-remix-icon';

import img from '../../assets/icon.png';
//import { ClothingCategoryTypes } from 'constants/Enums';

const SNAP_ITEM_SIZE = ITEM_SIZE() * 1.25; // Cell gap
const SPACING = 0;
const EMPTY_ITEM_SIZE = (screenWidth - ITEM_SIZE()) / 2;
const CURRENT_ITEM_SCALE = 5; // Height of the Slider

interface SliderPropsType {
	data: Array<UserClothing | Record<string, number>> | null;
	selectedIndex: (category: string, index: number) => void;
	category: string;
}

const Slider = ({ data, selectedIndex, category }: SliderPropsType) => {
	const emptyItem: UserClothing = {
		ciid: '',
		image_url: '',
		category: '',
		title: '',
		uid: '',
		brands: [],
		size: '',
		color: [],
		created_at: '',
	};

	const scrollX = useRef(new Animated.Value(0)).current;

	const currentIndex = useRef<number>(0);
	const flatListRef = useRef<FlatList<any>>(null);

	const handleOnViewableItemsChanged = useCallback(({ viewableItems }: any) => {
		const itemsInView = viewableItems.filter(
			({ item }: any) => (item.image_url && item.category) || item.ciid === ''
		);

		if (itemsInView.length === 0) {
			return;
		}

		currentIndex.current = itemsInView[0].index;

		const rawItemIndex = currentIndex.current - 1;

		selectedIndex(category, rawItemIndex);
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
				data={
					data && [
						...data.slice(0, data.length - 1),
						emptyItem,
						...data.slice(data.length - 1, data.length),
					]
				}
				renderItem={({ item, index }) => {
					if ((!item.image_url || !item.category) && item.ciid !== '') {
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
									{
										transform: [{ scale }],
										backgroundColor:
											item.ciid === ''
												? GlobalStyles.colorPalette.background
												: GlobalStyles.colorPalette.card[200],
									},
									styles.itemContent,
								]}
							>
								{item.ciid !== '' ? (
									<ItemCell imageUrl={item.image_url} disablePress />
								) : (
									<Icon
										name={GlobalStyles.icons.forbidOutline}
										color={GlobalStyles.colorPalette.primary[300]}
										size={GlobalStyles.sizing.icon.xLarge}
									/>
								)}
							</Animated.View>
						</View>
					);
				}}
				getItemLayout={getItemLayout}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(data, index) => {
					if (data.ciid) {
						return data.ciid;
					} else {
						return index;
					}
				}}
				bounces={false}
				decelerationRate={0}
				renderToHardwareTextureAndroid
				contentContainerStyle={styles.flatListContent}
				snapToInterval={SNAP_ITEM_SIZE}
				snapToAlignment="start"
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
				scrollEventThrottle={16}
				onViewableItemsChanged={handleOnViewableItemsChanged}
				viewabilityConfig={{
					itemVisiblePercentThreshold: 100,
				}}
			/>
		</View>
	);
};

export default Slider;

const styles = StyleSheet.create({
	flatListContent: {
		height: CURRENT_ITEM_SCALE * 2 + SNAP_ITEM_SIZE,
		alignItems: 'center',
	},
	itemContent: {
		marginHorizontal: SPACING,
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
		width: '100%',
		height: ITEM_SIZE(),
		aspectRatio: 1 / 1,
		borderRadius: GlobalStyles.utils.mediumRadius.borderRadius,
	},
});
