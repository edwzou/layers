import { View, StyleSheet, Pressable } from 'react-native';
import React, { useState, useRef } from 'react';
import { ClothingTypes, TagAction, } from '../../constants/Enums';
import Dropdown from '../../components/Dropdown/Dropdown';
import StackedTextBox from '../../components/Textbox/StackedTextbox';
import ItemCell from '../../components/Cell/ItemCell';
import { lowTranslateY } from '../../utils/modalMaxShow';
import ColorPicker from '../../components/ColorManager/ColorPicker';
import GeneralModal, {
	type refPropType,
} from '../../components/Modal/GeneralModal';
import { capitalizeFirstLetter } from '../../utils/misc';
import { ITEM_SIZE } from '../../utils/GapCalc';
import GlobalStyles from '../../constants/GlobalStyles';
import ColorTagsList from '../../components/ColorManager/ColorTagsList';
import { UserClothing } from '../Match';

import Icon from 'react-native-remix-icon';
import { ScrollView } from 'react-native-gesture-handler';

interface EditClothingPropsType {
	clothingItem: UserClothing;
}

const EditClothing = ({ clothingItem }: EditClothingPropsType) => {
	const colorPickerRef = useRef<refPropType>(null);

	const [currentColorTags, setColorTags] = useState(clothingItem.color);
	const [itemName, setItemName] = useState(clothingItem.title ? clothingItem.title : '');

	const [sizeOpen, setSizeOpen] = useState(false);
	const [sizeValue, setSizeValue] = useState(clothingItem.size ? clothingItem.size : '');
	const [sizes, setSizes] = useState(() => {
		if (clothingItem.category === ClothingTypes.outerwear || clothingItem.category === ClothingTypes.tops) {
			return [{
				label: 'XXS',
				value: 'xxs'
			},
			{
				label: 'XS',
				value: 'xs'
			},
			{
				label: 'S',
				value: 's'
			},
			{
				label: 'M',
				value: 'm'
			},
			{
				label: 'L',
				value: 'l'
			},
			{
				label: 'XL',
				value: 'xl'
			},
			{
				label: 'XXL',
				value: 'xxl'
			},];
		} else if (clothingItem.category === ClothingTypes.bottoms) {
			return [{
				label: 'US 28',
				value: 'xxs'
			},
			{
				label: 'US 30',
				value: 'xs'
			},
			{
				label: 'US 32',
				value: 's'
			},
			{
				label: 'US 34',
				value: 'm'
			},
			{
				label: 'US 36',
				value: 'l'
			},
			{
				label: 'US 38',
				value: 'xl'
			},
			{
				label: 'US 40',
				value: 'xxl'
			},];
		} else {
			return [{
				label: 'US 7',
				value: 'xxs'
			},
			{
				label: 'US 8',
				value: 'xs'
			},
			{
				label: 'US 9',
				value: 's'
			},
			{
				label: 'US 10',
				value: 'm'
			},
			{
				label: 'US 11',
				value: 'l'
			},
			{
				label: 'US 12',
				value: 'xl'
			},
			{
				label: 'US 13',
				value: 'xxl'
			},];
		}
	});

	const [itemTypeOpen, setItemTypeOpen] = useState(false);
	const [itemTypeValue, setItemTypeValue] = useState(clothingItem.category ? clothingItem.category : '');
	const [itemType, setItemType] = useState([
		{
			label: capitalizeFirstLetter(ClothingTypes.outerwear),
			value: ClothingTypes.outerwear,
		},
		{
			label: capitalizeFirstLetter(ClothingTypes.tops),
			value: ClothingTypes.tops,
		},
		{
			label: capitalizeFirstLetter(ClothingTypes.bottoms),
			value: ClothingTypes.bottoms,
		},
		{
			label: capitalizeFirstLetter(ClothingTypes.shoes),
			value: ClothingTypes.shoes,
		},
	]);

	const handleOnRemovePress = (colorToDelete: string) => {
		const updatedColorTags = currentColorTags.filter((color: string) => color !== colorToDelete);
		setColorTags(updatedColorTags);
	};

	const handleOnNewColorPress = (colorToAdd: string) => {
		if (!currentColorTags.some((color: string) => color === colorToAdd)) {
			setColorTags([...currentColorTags, colorToAdd]);
		}
		colorPickerRef.current?.scrollTo(0);
	};

	const handlePress = () => {
		console.log('DELETE BUTTON');
	};

	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={GlobalStyles.sizing.bottomSpacingPadding}>
				<View
					style={{
						marginHorizontal: GlobalStyles.layout.xGap,
						gap: GlobalStyles.layout.gap,
					}}
				>
					<StackedTextBox
						label="Item name"
						onFieldChange={setItemName}
						value={itemName}
					/>
					<ItemCell imageUrl={clothingItem.image_url} />
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={{ width: ITEM_SIZE(2) }}>
							<Dropdown
								label="Item type"
								open={itemTypeOpen}
								setOpen={setItemTypeOpen}
								setItems={setItemType}
								setValue={setItemTypeValue}
								items={itemType}
								value={itemTypeValue}
							/>
						</View>
						<View style={{ width: ITEM_SIZE(2) }}>
							<Dropdown
								label="Size"
								open={sizeOpen}
								setOpen={setSizeOpen}
								setItems={setSizes}
								setValue={setSizeValue}
								items={sizes}
								value={sizeValue}
							/>
						</View>
					</View>
					<ColorTagsList data={currentColorTags} tagAction={TagAction.remove} onAddPress={() => { colorPickerRef.current?.scrollTo(lowTranslateY) }}
						onRemovePress={handleOnRemovePress} />
				</View>
			</ScrollView>
			<View style={styles.deleteButtonContainer}>
				<Pressable onPress={handlePress}>
					<View style={styles.deleteButton}>
						<Icon
							name={GlobalStyles.icons.closeOutline}
							color={GlobalStyles.colorPalette.primary[300]}
							size={GlobalStyles.sizing.icon.regular}
						/>
					</View>
				</Pressable>
			</View>
			{/* <View
					style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}
				>
					<BrandTag
						action={TagAction.remove}
						label="Nike"
						onPress={() => {
							console.log('Brand Click');
						}}
					/>
					<BrandTag
						action={TagAction.remove}
						label="Arc'teryx"
						onPress={() => {
							console.log('Brand Click');
						}}
					/>
					<BrandTag
						action={TagAction.add}
						label="Arc'teryx"
						onPress={() => {
							console.log('Brand Click');
						}}
					/>
				</View> */}
			<GeneralModal
				ref={colorPickerRef}
				content={<ColorPicker onNewColorPress={handleOnNewColorPress} />}
				dim={false}
			/>
		</View >
	);
};

const styles = StyleSheet.create({
	deleteButtonContainer: {
		position: 'absolute',
		bottom: GlobalStyles.layout.gap * 2.5,
		alignSelf: 'center',
	},
	deleteButton: {
		width: 40,
		height: 40,
		...GlobalStyles.utils.fullRadius,
		backgroundColor: GlobalStyles.colorPalette.primary[200],
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: GlobalStyles.colorPalette.primary[300],
		...GlobalStyles.utils.deleteShadow,
	},
});

export default EditClothing;
