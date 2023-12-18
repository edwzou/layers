import { StyleSheet, View, FlatList, Text, Dimensions } from 'react-native';
import React, { useEffect } from 'react';

import Icon from 'react-native-remix-icon';
import { ITEM_SIZE } from '../../utils/GapCalc';
import { screenWidth, screenHeight } from '../../utils/modalMaxShow';
import OutfitCard from '../Card/OutfitCard';
import ItemCell from '../Cell/ItemCell';

import { ClothingTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

import { UserClothing, UserAllItems } from '../../pages/Match';
import { UserOutfit } from '../../pages/OutfitView';

interface CategorySlidePropsType {
	// ex) [{"clothing_items": {"bottoms": [Array], "outerwear": [Array], "shoes": [Array], "tops": [Array]}, "created_at": "2023-10-14T07:15:07.986Z", "oid": "a11bdae9-9ecb-48f4-8ac2-802809034a0f", "title": "Weekend Casual", "uid": "890e7fad-1352-4998-8f2f-ff8b74b04b86"}]
	itemsData: UserAllItems; //! !! fix any type
	handleItemChange: (item: any) => void;
}

const CategorySlide = ({ itemsData, handleItemChange }: CategorySlidePropsType) => {

	const windowWidth = Dimensions.get('window').width;

	return (
		<View style={[styles.container, { width: windowWidth - 2 * GlobalStyles.layout.xGap }]}>
			{itemsData.data && itemsData.data.length !== 0 ?
				(
					itemsData.category == 'outfits' ? (
						<FlatList
							data={itemsData.data as UserOutfit[]}
							renderItem={({ item }) => {
								//console.log(item)
								return (
									<OutfitCard
										title={item.title}
										clothingItems={item.clothing_items}
										onPress={() => { handleItemChange(item) }}
									/>
								)
							}}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{ gap: GlobalStyles.layout.gap }}
							ListFooterComponent={
								<View style={{ padding: screenHeight * 0.15 }} />
							}
						/>
					) : (
						<FlatList
							data={itemsData.data as UserClothing[]}
							renderItem={({ item }) => {
								//console.log(item);
								return (
									<View style={{ width: ITEM_SIZE(2) }}>
										<ItemCell
											imageUrl={item.image_url}
											key={item.ciid}
											onPress={() => handleItemChange(item)}
										/>
									</View>
								)
							}}
							numColumns={2}
							contentContainerStyle={{ gap: GlobalStyles.layout.gap }}
							columnWrapperStyle={{ gap: GlobalStyles.layout.gap }}
							showsVerticalScrollIndicator={false}
							ListFooterComponent={
								<View style={{ padding: screenHeight * 0.15 }} />
							}
						/>
					)
				) :
				<View style={{ alignItems: 'center', flex: 1, top: GlobalStyles.layout.pageStateTopMargin, gap: 5, width: screenWidth - GlobalStyles.layout.xGap * 2 }}>
					<Icon
						name={GlobalStyles.icons.bubbleOutline}
						color={GlobalStyles.colorPalette.primary[300]}
						size={GlobalStyles.sizing.icon.large}
					/>
					<Text style={[GlobalStyles.typography.subtitle, { color: GlobalStyles.colorPalette.primary[300] }]}>Empty</Text>
				</View>}
		</View>
	);
};

export default CategorySlide;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: GlobalStyles.layout.xGap,
	},
});

