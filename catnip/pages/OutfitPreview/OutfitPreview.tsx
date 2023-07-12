import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import React, { useState } from 'react';

import StackedTextbox from '../../components/Textbox/StackedTextbox';
import ItemCell from '../../components/Cell/ItemCell';
import { ITEM_SIZE } from '../../utils/GapCalc';
import GlobalStyles from '../../constants/GlobalStyles';

import img1 from '../../assets/img1.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';

const screenHeight = Dimensions.get('window').height;

// !!! Substitute this for actual data
const testData = [
	{
		id: 'img1',
		img: img1,
		title: 'burberry',
	},
	{
		id: 'img2',
		img: img2,
		title: 'shoe',
	},
	{
		id: 'img3',
		img: img3,
		title: 'pant',
	},
	{
		id: 'img4',
		img: img3,
		title: 'pant',
	},
	{
		id: 'img5',
		img: img3,
		title: 'pant',
	},
	{
		id: 'img6',
		img: img3,
		title: 'pant',
	},
	{
		id: 'img7',
		img: img3,
		title: 'pant',
	},
	{
		id: 'img38',
		img: img3,
		title: 'pant',
	},
];

const OutfitPreview = () => {
	const [text, setText] = useState('TEST OUTFIT');
	const onInputChange = (text: string) => {
		setText(text);
	};

	return (
		<View style={styles.container}>
			<StackedTextbox
				label="Match name"
				onFieldChange={onInputChange}
				value={text}
			/>
			<FlatList
				data={testData}
				renderItem={({ item }) => <ItemCell image={item.img} size={ITEM_SIZE} disablePress={false} />}
				numColumns={2}
				contentContainerStyle={{ gap: GlobalStyles.layout.xGap }}
				columnWrapperStyle={{ gap: GlobalStyles.layout.xGap }}
				style={{ height: screenHeight - 350 }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		gap: GlobalStyles.layout.xGap,
	},
});

export default OutfitPreview;
