import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ItemCell from '../../components/Cell/ItemCell';

import GlobalStyles from '../../constants/GlobalStyles';
import { FlatList } from 'react-native-gesture-handler';
import ColorTag from '../../components/Tag/ColorTag';
import { TagAction, ColorTags } from '../../constants/Enums';
import { outfitData } from '../../constants/testData';
import BrandTag from '../../components/Tag/BrandTag';

const OutfitView = () => {
	return (
		<FlatList
			data={outfitData[0].items.slice(1)}
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
			ListHeaderComponent={<ItemCell image={outfitData[0].items[0].image} />}
			keyExtractor={(item) => item.id}
			contentContainerStyle={{ gap: GlobalStyles.layout.gap }}
			columnWrapperStyle={{ gap: GlobalStyles.layout.gap }}
			ListFooterComponent={
				<View style={{ gap: 20, }}>
					<View style={[styles.categoryContainer, { top: 4, }]}>
						<Text style={styles.subheader}>Colors</Text>
						<View style={styles.tagsContainer}>
							<ColorTag
								action={TagAction.static}
								color={ColorTags.Red}
							/>
							<ColorTag
								action={TagAction.static}
								color={ColorTags.Orange}
							/>
							<ColorTag
								action={TagAction.static}
								color={ColorTags.Yellow}
							/>
						</View>
					</View>
					<View style={styles.categoryContainer}>
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
					</View>
					{/* !!! Very hacky solution, try to fix this */}
					<View style={{ height: 100 }} />
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
