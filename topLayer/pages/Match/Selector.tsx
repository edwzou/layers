import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Slider from './Slider';
import { type UserClothing, type UserClothingPadding } from '.';
import { ScrollView } from 'react-native-gesture-handler';
import GlobalStyles from '../../constants/GlobalStyles';
import { ClothingTypes } from '../../constants/Enums';

interface SelectorPropsType {
	outerwear: UserClothing[];
	tops: UserClothing[];
	bottoms: UserClothing[];
	shoes: UserClothing[];
	selectedIndex: (category: string, index: number) => void;
}

const Selector = ({
	outerwear,
	tops,
	bottoms,
	shoes,
	selectedIndex,
}: SelectorPropsType) => {
	const [dataWithPlaceholders, setDataWithPlaceholders] =
		useState<UserClothingPadding>({
			outerwear: [] as Array<UserClothing | Record<string, number>>,
			tops: [] as Array<UserClothing | Record<string, number>>,
			bottoms: [] as Array<UserClothing | Record<string, number>>,
			shoes: [] as Array<UserClothing | Record<string, number>>,
		});

	const padding: Record<string, number> = { id: -1 };

	useEffect(() => {
		if (outerwear !== null && outerwear.length > 0)
			setDataWithPlaceholders((placeholderData) => ({
				...placeholderData,
				outerwear: [padding, ...outerwear, { id: outerwear.length }],
			}));
		if (tops !== null && tops.length > 0)
			setDataWithPlaceholders((placeholderData) => ({
				...placeholderData,
				tops: [padding, ...tops, { id: tops.length }],
			}));
		if (bottoms !== null && bottoms.length > 0)
			setDataWithPlaceholders((placeholderData) => ({
				...placeholderData,
				bottoms: [padding, ...bottoms, { id: bottoms.length }],
			}));
		if (shoes !== null && shoes.length > 0)
			setDataWithPlaceholders((placeholderData) => ({
				...placeholderData,
				shoes: [padding, ...shoes, { id: shoes.length }],
			}));
	}, [outerwear, tops, bottoms, shoes]);

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={GlobalStyles.sizing.bottomSpacingPadding}
		>
			{outerwear !== null && outerwear.length > 0 ? (
				<Slider
					data={dataWithPlaceholders.outerwear}
					selectedIndex={selectedIndex}
					category={ClothingTypes.outerwear}
				/>
			) : null}
			{tops !== null && tops.length > 0 ? (
				<Slider
					data={dataWithPlaceholders.tops}
					selectedIndex={selectedIndex}
					category={ClothingTypes.tops}
				/>
			) : null}
			{bottoms !== null && bottoms.length > 0 ? (
				<Slider
					data={dataWithPlaceholders.bottoms}
					selectedIndex={selectedIndex}
					category={ClothingTypes.bottoms}
				/>
			) : null}
			{shoes !== null && shoes.length > 0 ? (
				<Slider
					data={dataWithPlaceholders.shoes}
					selectedIndex={selectedIndex}
					category={ClothingTypes.shoes}
				/>
			) : null}
		</ScrollView>
	);
};

export default Selector;
