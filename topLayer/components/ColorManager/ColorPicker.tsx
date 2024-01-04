import React, { useState, useEffect, type ReactElement } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ColorTag from '../Tag/ColorTag';
import { TagAction } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';
import { screenWidth } from '../../utils/modalMaxShow';

interface ColorPickerPropsType {
	onNewColorPress: (colorToAdd: string) => void;
}

const ColorPicker = ({
	onNewColorPress,
}: ColorPickerPropsType): ReactElement => {
	const colors = [
		'#4891FF',
		'#46B9C9',
		'#A3DEC9',
		'#6DC86E',
		'#76956B',
		'#EEE16B',
		'#E8D3B4',
		'#977854',
		'#EBA655',
		'#E55A5A',
		'#AD4E4E',
		'#F67ECE',
		'#B77AC7',
		'#3869B2',
		'#121212',
		'#CDCDCD',
		'#FFFBEB',
		'#FFFFF7',
	];

	const tagWidth = 60; // Adjust this value according to your desired tag size

	const [tagsPerRow, setTagsPerRow] = useState(4); // Initial number of tags per row
	const screenWidth = Dimensions.get('window').width;

	useEffect(() => {
		// Calculate the optimal number of tags per row based on aspect ratio
		const optimalTagsPerRow = Math.floor(screenWidth / tagWidth);
		setTagsPerRow(optimalTagsPerRow);
	}, [screenWidth]);

	const renderColorTags = (): ReactElement[] => {
		const rows = Math.ceil(colors.length / tagsPerRow);

		const colorTagRows = [];
		for (let i = 0; i < rows; i++) {
			const rowColors = colors.slice(i * tagsPerRow, (i + 1) * tagsPerRow);
			colorTagRows.push(
				<View key={i} style={styles.row}>
					{rowColors.map((color, index) => (
						<ColorTag
							key={index}
							action={TagAction.push}
							color={color}
							onPress={() => {
								onNewColorPress(color);
							}}
						/>
					))}
				</View>
			);
		}

		return colorTagRows;
	};

	return <View style={styles.container}>{renderColorTags()}</View>;
};

const styles = StyleSheet.create({
	container: {
		...GlobalStyles.utils.mediumRadius,
		padding: 10,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: screenWidth / 20,
		marginVertical: screenWidth / 20 / 2,
	},
});

export default ColorPicker;
