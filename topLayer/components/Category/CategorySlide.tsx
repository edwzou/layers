import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import React, { type ReactElement } from 'react';
import { ITEM_SIZE } from '../../utils/GapCalc';
import { screenHeight } from '../../utils/modalMaxShow';
import OutfitCard from '../Card/OutfitCard';
import ItemCell from '../Cell/ItemCell';
import GlobalStyles from '../../constants/GlobalStyles';
import { type UserClothing } from '../../types/Clothing';
import { type UserOutfit } from '../../types/Outfit';
import Empty from './Empty';
import { type UserAllItems } from '../../types/AllItems';

interface CategorySlidePropsType {
	// ex)
	// [{"clothing_items": {"bottoms": [Array], "outerwear": [Array], "shoes": [Array], "tops": [Array]},
	// "created_at": "2023-10-14T07:15:07.986Z", "oid": "a11bdae9-9ecb-48f4-8ac2-802809034a0f",
	// "title": "Weekend Casual", "uid": "890e7fad-1352-4998-8f2f-ff8b74b04b86"}]
	itemsData: UserAllItems;
	handleItemChange: (item: UserClothing | UserOutfit) => void;
}

const CategorySlide = ({
	itemsData,
	handleItemChange,
}: CategorySlidePropsType): ReactElement => {
	const windowWidth = Dimensions.get('window').width;

	const slide = (): ReactElement => {
		if (itemsData.category === 'outfits') {
			return (
				<FlatList
					data={itemsData.data as UserOutfit[]}
					renderItem={({ item }) => {
						return (
							<OutfitCard
								title={item.title}
								clothingItems={item.clothing_items}
								onPress={() => {
									handleItemChange(item);
								}}
							/>
						);
					}}
					keyExtractor={(item) => {
						return item.oid;
					}}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ gap: GlobalStyles.layout.gap }}
					ListFooterComponent={
						<View style={{ padding: screenHeight * 0.15 }} />
					}
				/>
			);
		} else {
			return (
				<FlatList
					data={itemsData.data as UserClothing[]}
					renderItem={({ item }) => {
						return (
							<View style={{ width: ITEM_SIZE(2) }}>
								<ItemCell
									imageUrl={item.image_url}
									key={item.ciid}
									onPress={() => {
										handleItemChange(item);
									}}
								/>
							</View>
						);
					}}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ gap: GlobalStyles.layout.gap }}
					columnWrapperStyle={{ gap: GlobalStyles.layout.gap }}
					ListFooterComponent={
						<View style={{ padding: screenHeight * 0.15 }} />
					}
				/>
			);
		}
	};
	return (
		<>
			{itemsData.data !== null &&
			itemsData.data !== undefined &&
			itemsData.data.length !== 0 ? (
				<View
					style={[
						styles.container,
						{ width: windowWidth - 2 * GlobalStyles.layout.xGap },
					]}
				>
					{slide()}
				</View>
			) : (
				<Empty category={itemsData.category} />
			)}
		</>
	);
};

export default CategorySlide;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: GlobalStyles.layout.xGap,
	},
});
