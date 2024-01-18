import { StyleSheet, Text, View } from 'react-native';
import React, { type ReactElement } from 'react';
import ItemCell from '../../components/Cell/ItemCell';
import GlobalStyles from '../../constants/GlobalStyles';
import ColorTagsList from '../../components/ColorManager/ColorTagsList';
import { StepOverTypes, TagAction } from '../../constants/Enums';
import { type UserClothing } from '../../types/Clothing';
import Header from '../../components/Header/Header';
import OutfitBlockLayout from '../../components/Outfit/OutfitBlockLayout';

interface OutfitViewPropsType {
	title: string;
	clothingItems: UserClothing[];
	directToOutfitEdit?: () => void;
}

const OutfitView = ({
	title,
	clothingItems,
	directToOutfitEdit,
}: OutfitViewPropsType): ReactElement => {
	const allColors = clothingItems.flatMap((item) => item.color);
	const uniqueColors = Array.from(new Set(allColors));

	return (
		<View style={styles.container}>
			<Header
				text={title}
				rightButton={
					directToOutfitEdit !== null && directToOutfitEdit !== undefined
				}
				rightStepOverType={StepOverTypes.edit}
				rightButtonAction={directToOutfitEdit}
			/>
			<OutfitBlockLayout
				data={clothingItems.slice(1)}
				headerComponent={
					clothingItems.length > 0 ? (
						<ItemCell imageUrl={clothingItems[0].image_url} />
					) : undefined
				}
				footerComponent={
					<View style={styles.colorContainer}>
						<View style={styles.categoryContainer}>
							{uniqueColors.length > 0 ? (
								<Text style={styles.subheader}>Colors</Text>
							) : null}
							<ColorTagsList data={uniqueColors} tagAction={TagAction.static} />
						</View>
					</View>
				}
			/>
		</View>
	);
};

export default OutfitView;

const styles = StyleSheet.create({
	colorContainer: {
		gap: 20,
	},
	container: {
		paddingTop: 20,
		gap: GlobalStyles.layout.gap,
		flex: 1,
	},
	subheader: {
		...GlobalStyles.typography.body,
	},
	categoryContainer: {
		top: 4,
		gap: 10,
	},
});
