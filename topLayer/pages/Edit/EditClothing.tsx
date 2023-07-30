import { View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { ClothingTypes, TagAction } from '../../constants/Enums';
import ColorTag from '../../components/Tag/ColorTag';
import BrandTag from '../../components/Tag/BrandTag';
import Dropdown from '../../components/Dropdown/Dropdown';
import StackedTextBox from '../../components/Textbox/StackedTextbox';
import ItemCell from '../../components/Cell/ItemCell';

import { capitalizeFirstLetter } from '../../utils/misc';
import { ITEM_SIZE } from '../../utils/GapCalc';

import GlobalStyles from '../../constants/GlobalStyles';
import pants from '../../assets/testPants1.png';

const EditClothing = () => {
	const [itemName, setItemName] = useState('');

	const [sizeOpen, setSizeOpen] = useState(false);
	const [sizeValue, setSizeValue] = useState(null);
	const [sizes, setSizes] = useState([
		{ label: 'Extra-extra small', value: 'xxs' },
		{ label: 'Extra small', value: 'xs' },
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

	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					marginHorizontal: GlobalStyles.layout.xGap,
					gap: GlobalStyles.layout.gap,
				}}
			>
				<StackedTextBox label="Item name" onFieldChange={setItemName} />
				<ItemCell image={pants} />
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
			<SafeAreaView style={{ flex: 1 }}>
				{/* !!! ScrollView height may be inconsistent */}
				<ScrollView
					contentContainerStyle={{
						paddingBottom: GlobalStyles.layout.xGap * 6,
						paddingHorizontal: GlobalStyles.layout.xGap,
						marginTop: GlobalStyles.layout.gap,
						gap: GlobalStyles.layout.gap,
					}}
				>
					<View
						style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1, gap: 5 }}
					>
						<ColorTag
							label="Olive"
							bgColor="#76956B"
							action={TagAction.add}
							onPress={() => {
								console.log('Color Click');
							}}
						/>
						<ColorTag
							label="Olive"
							bgColor="#76956B"
							action={TagAction.remove}
							onPress={() => {
								console.log('Color Click');
							}}
						/>
					</View>
					<View
						style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1, gap: 5 }}
					>
						<BrandTag
							label="Arc'teryx"
							action={TagAction.add}
							onPress={() => {
								console.log('Brand Click');
							}}
						/>
						<BrandTag
							label="yet"
							action={TagAction.remove}
							onPress={() => {
								console.log('Brand Click');
							}}
						/>
						<BrandTag
							label="Arc'teryx"
							action={TagAction.remove}
							onPress={() => {
								console.log('Brand Click');
							}}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

export default EditClothing;
