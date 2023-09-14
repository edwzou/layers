import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ItemCell from '../../components/Cell/ItemCell';

import GlobalStyles from '../../constants/GlobalStyles';
import { FlatList } from 'react-native-gesture-handler';
import ColorTagsList from '../../components/ColorManager/ColorTagsList';
import { TagAction, ColorTags } from '../../constants/Enums';
import BrandTag from '../../components/Tag/BrandTag';

import { UserOutfit } from '.'

interface OutfitViewPropsType {
	outfit: UserOutfit;
}

const OutfitView = ({ outfit }: OutfitViewPropsType) => {

	const allColors = outfit.items.flatMap(item => item.colors);
	const uniqueColorsNames = Array.from(new Set(allColors.map(color => color[0])));
	const uniqueColors = uniqueColorsNames.map(name => ColorTags[name]);

	return (
		<FlatList
			data={outfit.items.slice(1)}
			numColumns={2}
			renderItem={({ item, index }) => {
				return (
					<View style={{ flex: 1 / 2 }}>
						<ItemCell image={item.image} disablePress />
					</View>
				);
			}}
			style={styles.container}
			showsVerticalScrollIndicator={false}
			ListHeaderComponent={<ItemCell image={outfit.items[0].image} />}
			contentContainerStyle={{ gap: GlobalStyles.layout.gap }}
			columnWrapperStyle={{ gap: GlobalStyles.layout.gap }}
			ListFooterComponent={
				<View style={{ gap: 20, }}>
					<View style={[styles.categoryContainer, { top: 4, }]}>
						<Text style={styles.subheader}>Colors</Text>
						<ColorTagsList
							data={uniqueColors}
							tagAction={TagAction.static}
						/>
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
					<View style={GlobalStyles.sizing.bottomSpacing} />
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
