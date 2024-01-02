import { StyleSheet, Text, View } from 'react-native';
import React, { type ReactElement } from 'react';
import ItemCell from '../../components/Cell/ItemCell';

import GlobalStyles from '../../constants/GlobalStyles';
import { FlatList } from 'react-native-gesture-handler';
import ColorTagsList from '../../components/ColorManager/ColorTagsList';
import { TagAction } from '../../constants/Enums';
import { screenHeight } from '../../utils/modalMaxShow';

import { type UserClothing } from '../../pages/Match';

interface OutfitViewPropsType {
	clothingItems: UserClothing[];
}

const OutfitView = ({ clothingItems }: OutfitViewPropsType): ReactElement => {
	const allColors = clothingItems.flatMap((item) => item.color);
	const uniqueColors = Array.from(new Set(allColors));

	return (
		<FlatList
			data={clothingItems.slice(1)}
			numColumns={2}
			renderItem={({ item }) => {
				return (
					<View style={{ flex: 1 / 2 }}>
						<ItemCell imageUrl={item.image_url} disablePress />
					</View>
				);
			}}
			keyExtractor={(item) => {
				return item.ciid;
			}}
			style={styles.container}
			showsVerticalScrollIndicator={false}
			ListHeaderComponent={
				clothingItems.length > 0 ? (
					<ItemCell imageUrl={clothingItems[0].image_url} />
				) : null
			}
			contentContainerStyle={{ gap: GlobalStyles.layout.gap }}
			columnWrapperStyle={{ gap: GlobalStyles.layout.gap }}
			ListFooterComponent={
				<View style={{ gap: 20 }}>
					<View style={[styles.categoryContainer, { top: 4 }]}>
						{uniqueColors.length > 0 && (
							<Text style={styles.subheader}>Colors</Text>
						)}
						<ColorTagsList data={uniqueColors} tagAction={TagAction.static} />
					</View>
					{/* <View style={styles.categoryContainer}>
						<Text style={styles.subheader}>Brands</Text>
						<View style={styles.tagsContainer}>
							<BrandTag
								label="Gap"
								onPress={() => { }}
								action={TagAction.remove}
							/>
							<BrandTag
								label="Nike"
								onPress={() => { }}
								action={TagAction.remove}
							/>
						</View>
					</View> */}
					{/* !!! Very hacky solution, try to fix this */}
					<View style={{ padding: screenHeight * 0.05 }} />
				</View>
			}
		/>
	);
};

export default OutfitView;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: GlobalStyles.layout.xGap,
		gap: GlobalStyles.layout.gap,
		flex: 1,
	},
	items: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		gap: GlobalStyles.layout.gap,
		flex: 1,
	},
	subheader: {
		...GlobalStyles.typography.body,
	},
	categoryContainer: {
		gap: 10,
	},
	tagsContainer: {
		flexDirection: 'row',
		gap: 10,
	},
});
