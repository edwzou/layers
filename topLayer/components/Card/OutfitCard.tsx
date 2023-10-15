import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';

import GlobalStyles from '../../constants/GlobalStyles';

import ItemCell from '../Cell/ItemCell';
import { screenWidth } from '../../utils/modalMaxShow';
import { ITEM_SIZE } from '../../utils/GapCalc';
import { type UserClothing } from '../../pages/Match';
import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';

const itemCellSize = (screenWidth - 60) / 4;

interface OutfitCardPropsType {
	title: string;
	items: string[];
	onPress: () => void;
}

export default function OutfitCard({
	title,
	items,
	onPress,
}: OutfitCardPropsType) {
	const truncatedTitle = title.length > 70 ? title.slice(0, 70) + '...' : title;

	const [clothingItems, setClothingItems] = useState<UserClothing[]>([]);

	useEffect(() => {
		const getClothingItems = async () => {
			let fetchedClothingItems: UserClothing[] = [];
			for (let i = 0; i < items.length; i++) {
				const { data, status } = await axios.get(`${baseUrl}/api/private/clothing_items/${items[i]}`);

				if (status === 200) {
					fetchedClothingItems.push(data.data);
				}
			}
			setClothingItems(fetchedClothingItems);
		};

		void getClothingItems();
	}, []);

	return (
		<Pressable style={styles.container} onPress={onPress}>
			<View style={styles.infoBox}>
				<Text style={styles.title}>{truncatedTitle}</Text>
				<Text>
					<View style={[styles.label, GlobalStyles.utils.tagShadow]}>
						<Text style={styles.labelText}>{clothingItems.length} items</Text>
					</View>
				</Text>
			</View>
			<View style={styles.itemsContainer}>
				<FlatList
					data={clothingItems.slice(0, 4)}
					renderItem={({ item }) => (
						<View style={styles.itemContainer}>
							<ItemCell
								imageUrl={item.image_url}
								disablePress={true}
								imageStyle={{ width: '85%', height: '85%' }}
							/>
						</View>
					)}
					numColumns={2}
				/>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		width: screenWidth - GlobalStyles.layout.xGap * 2,
		aspectRatio: 1.8,
		borderRadius: GlobalStyles.utils.mediumRadius.borderRadius,
		backgroundColor: GlobalStyles.colorPalette.card[100],
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
	},
	infoBox: {
		height: itemCellSize * 2,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	title: {
		...GlobalStyles.typography.body,
		width: screenWidth - (itemCellSize * 2 + 10 * 9),
	},
	label: {
		backgroundColor: GlobalStyles.colorPalette.primary[500],
		...GlobalStyles.utils.tagShape,
		...GlobalStyles.utils.tagShadow,
		shadowColor: GlobalStyles.colorPalette.primary[400]
	},
	labelText: {
		color: GlobalStyles.colorPalette.background,
		...GlobalStyles.typography.body,
	},
	itemContainer: {
		width: ((((screenWidth - GlobalStyles.layout.xGap * 2) / 1.8) - 40) / 2) - 5,
		margin: 5
	},
	itemsContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		height: (((screenWidth - GlobalStyles.layout.xGap * 2) / 1.8) - 40) + 10,
		aspectRatio: 1,
	},
});
