import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';

import { ITEM_SIZE } from '../../utils/GapCalc';
import { screenWidth, screenHeight } from '../../utils/modalMaxShow';
import OutfitCard from '../Card/OutfitCard';
import ItemCell from '../Cell/ItemCell';

import { ClothingTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

interface CategorySlidePropsType {
	clothingData: any; //! !! fix any type
	onPress: () => void;
}

const CategorySlide = ({ clothingData, onPress }: CategorySlidePropsType) => {
	return (
		<View style={styles.container}>
			{clothingData.category === ClothingTypes.outfits ? (
				<FlatList
					data={clothingData.data}
					renderItem={({ item }) => (
						<OutfitCard
							title={item.title}
							itemCount={item.items.length}
							items={item.items}
							onPress={onPress}
						/>
					)}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ gap: GlobalStyles.layout.gap }}
					ListFooterComponent={
						<View style={{ padding: screenHeight * 0.05 }} />
					}
				/>
			) : (
				<FlatList
					style={{ width: screenWidth - GlobalStyles.layout.xGap * 2 }}
					data={clothingData.data}
					renderItem={({ item }) => (
						<View style={{ width: ITEM_SIZE(2) }}>
							<ItemCell image={item.image} key={item.id} onPress={onPress} />
						</View>
					)}
					numColumns={2}
					contentContainerStyle={{ gap: GlobalStyles.layout.gap }}
					columnWrapperStyle={{ gap: GlobalStyles.layout.gap }}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={
						<View style={{ padding: screenHeight * 0.05 }} />
					}
				/>
			)}
		</View>
	);
};

export default CategorySlide;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: GlobalStyles.layout.xGap,
	},
});
