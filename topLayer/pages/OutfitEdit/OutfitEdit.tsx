import { View, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import ItemCell from '../../components/Cell/ItemCell';
import GlobalStyles from '../../constants/GlobalStyles';
import StackedTextbox from '../../components/Textbox/StackedTextbox';

import { ITEM_SIZE } from '../../utils/GapCalc';
import { screenHeight } from '../../utils/modalMaxShow';
import { type UserOutfit } from '.';
import { outfitEdit } from '../../constants/GlobalStrings'

import Icon from 'react-native-remix-icon';

// type OutfitPreviewPropsType = {
//     outerwear: UserOutfit,
//     tops: UserOutfit,
//     bottoms: UserOutfit,
//     shoes: UserOutfit,
//     matchName: (text: string) => void;
// }

interface OutfitViewPropsType {
	outfit: UserOutfit;
}

const OutfitEdit = ({ outfit }: OutfitViewPropsType) => {
	const [text, setText] = useState('');
	const [rawData, setRawData] = useState<UserOutfit[]>([]);
	const [data, setData] = useState<UserOutfit[]>([]);
	const onInputChange = (text: string) => {
		setText(text);
		// matchName(text);
	};

	// useEffect(() => {
	//     setRawData([outerwear, tops, bottoms, shoes])
	// }, [outerwear, tops, bottoms, shoes])

	useEffect(() => {
		setData(rawData.filter(Boolean));
	}, [rawData]);

	const handlePress = () => {
		console.log('DELETE BUTTON');
	};

	return (
		<View style={styles.container}>
			<StackedTextbox
				label={outfitEdit.outfitName}
				onFieldChange={onInputChange}
				value={text}
			/>
			<FlatList
				data={outfit.items}
				renderItem={({ item }) => {
					return (
						<View style={{ width: ITEM_SIZE(2) }}>
							<ItemCell image={item.image} disablePress={false} key={item.id} canDelete={true} />
						</View>
					);
				}}
				numColumns={2}
				contentContainerStyle={{ gap: GlobalStyles.layout.gap }}
				columnWrapperStyle={{ gap: GlobalStyles.layout.gap }}
				style={{ height: screenHeight - 350, padding: 6 }}
			/>
			<Pressable onPress={handlePress} style={{
				position: 'absolute',
				bottom: GlobalStyles.layout.highTranslateYBottomMargin,
				alignSelf: 'center',
			}}>
				<Icon
					name={GlobalStyles.icons.deleteBin2Line}
					color={GlobalStyles.colorPalette.danger[500]}
					size={GlobalStyles.sizing.icon.regular}
				/>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: GlobalStyles.layout.xGap - 6, // Gives extra room for the item cell delete button to render
		gap: GlobalStyles.layout.gap,
		flex: 1,
	},
});

export default OutfitEdit;
