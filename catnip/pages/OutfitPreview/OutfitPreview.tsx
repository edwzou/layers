import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import React, { useState } from 'react';

import StackedTextbox from '../../components/Textbox/StackedTextbox';
import ItemCell from '../../components/ItemCell';
import GlobalStyles from '../../constants/GlobalStyles';

import img1 from '../../assets/testImg.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';

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

const screenWidth =
	Dimensions.get('window').width - GlobalStyles.layout.xGap * 2;
const screenHeight = Dimensions.get('window').height;
const numColumns = 2;
const gap = 16;

const availableSpace = screenWidth - (numColumns - 1) * gap;
const itemSize = availableSpace / numColumns;

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
				renderItem={({ item }) => <ItemCell image={item.img} size={itemSize} />}
				numColumns={numColumns}
				contentContainerStyle={{ gap }}
				columnWrapperStyle={{ gap }}
				style={{ height: screenHeight - 350 }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		gap: 16,
	},
});

export default OutfitPreview;
