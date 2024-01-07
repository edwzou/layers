import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import ItemCell from '../Cell/ItemCell';
import { screenWidth } from '../../utils/modalMaxShow';
import { type UserClothing } from '../../types/Clothing';

const itemCellSize = (screenWidth - 60) / 4;

interface OutfitCardPropsType {
	title: string;
	clothingItems: UserClothing[];
	onPress: () => void;
}

export default function OutfitCard({
	title,
	clothingItems,
	onPress,
}: OutfitCardPropsType): ReactElement {
	const truncatedTitle = title.length > 70 ? title.slice(0, 70) + '...' : title;
	const clothingArray = Object.values(clothingItems).flat().slice(0, 4);

	return (
		<Pressable style={styles.container} onPress={onPress}>
			<View style={styles.infoBox}>
				<Text style={styles.title}>{truncatedTitle}</Text>
				<Text>
					<View style={[styles.label]}>
						<Text style={styles.labelText}>{clothingArray.length} items</Text>
					</View>
				</Text>
			</View>
			<View style={styles.itemsContainer}>
				<FlatList
					data={clothingArray}
					renderItem={({ item }) => (
						<View style={styles.itemContainer}>
							<ItemCell
								imageUrl={item.image_url}
								disablePress={true}
								imageStyle={{ width: '85%', height: '85%' }}
							/>
						</View>
					)}
					keyExtractor={(item) => {
						return item.ciid;
					}}
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
		shadowColor: GlobalStyles.colorPalette.primary[400],
	},
	labelText: {
		color: GlobalStyles.colorPalette.background,
		...GlobalStyles.typography.body,
	},
	itemContainer: {
		width: ((screenWidth - GlobalStyles.layout.xGap * 2) / 1.8 - 40) / 2 - 5,
		margin: 5,
	},
	itemsContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		height: (screenWidth - GlobalStyles.layout.xGap * 2) / 1.8 - 40 + 10,
		aspectRatio: 1,
	},
});
