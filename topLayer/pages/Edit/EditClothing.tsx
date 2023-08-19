import { View, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import React, { useState, useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { ClothingTypes, TagAction, ColorTags } from '../../constants/Enums';
import ColorTag from '../../components/Tag/ColorTag';
import BrandTag from '../../components/Tag/BrandTag';
import Dropdown from '../../components/Dropdown/Dropdown';
import StackedTextBox from '../../components/Textbox/StackedTextbox';
import ItemCell from '../../components/Cell/ItemCell';

import { medTranslateY } from '../../utils/modalMaxShow';

import ColorPicker from '../../pages/Edit/ColorPicker';

import GeneralModal, {
	type refPropType,
} from '../../components/Modal/GeneralModal';

import { capitalizeFirstLetter } from '../../utils/misc';
import { ITEM_SIZE } from '../../utils/GapCalc';

import GlobalStyles from '../../constants/GlobalStyles';
import { colorTags } from '../../constants/testData';
import pants from '../../assets/testPants1.png';
import ColorTagsList from './ColorTagsList';

const EditClothing = () => {
	const colorPickerRef = useRef<refPropType>(null);

	const [currentColorTags, setColorTags] = useState(colorTags);
	const [itemName, setItemName] = useState('');

	const [sizeOpen, setSizeOpen] = useState(false);
	const [sizeValue, setSizeValue] = useState(null);
	const [sizes, setSizes] = useState([
		{ label: 'Extra-extra small', value: 'xxs' },
		{ label: 'Extra small', value: 'xs' },
		{ label: 'Small', value: 's' },
		{ label: 'Medium', value: 'm' },
		{ label: 'Large', value: 'l' },
		{ label: 'Extra large', value: 'xl' },
		{ label: 'Extra-extra large', value: 'xxl' },
	]);

	const [itemTypeOpen, setItemTypeOpen] = useState(false);
	const [itemTypeValue, setItemTypeValue] = useState(null);
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

	const handleOnRemovePress = (colorToDelete: [string, string]) => {
		const updatedColorTags = currentColorTags.filter((color) => color !== colorToDelete);
		setColorTags(updatedColorTags);
	};

	const handleOnNewColorPress = (colorToAdd: [string, string]) => {
		setColorTags([...currentColorTags, colorToAdd]);
		colorPickerRef.current?.scrollTo(0)
	};

	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					marginHorizontal: GlobalStyles.layout.xGap,
					gap: GlobalStyles.layout.gap,
				}}
			>
				<StackedTextBox label="Item name" onFieldChange={setItemName} />
				<ItemCell image={pants} canDelete={true} />
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
			</View>
			<ColorTagsList data={currentColorTags} onAddPress={() => { colorPickerRef.current?.scrollTo(medTranslateY) }}
				onRemovePress={handleOnRemovePress} />
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
	colorPickerContainer: {
		position: 'absolute',
		width: '100%',
		alignItems: 'center',
		marginBottom: 10,
	},
});

export default EditClothing;
