import React, { memo } from 'react';
import { Image, ImageStyle, Pressable, StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';

type ItemCellPropsType = {
	image: any; // !!! Replace 'any' with 'string'
	disablePress?: boolean;
	imageStyle?: ImageStyle;
	handlePress?: () => void;
};

/**
 * Cells for items
 * * NOTE: wrap cells in a wrapper to adjust size; ItemCell fills the wrapper *
 * @param {string} image - Item image 
 * @param {boolean} disablePress - Disables Pressable functionality
 * @param {ImageStyle} imageStyle - Custom image styling
 * @function handlePress
 * @returns {ReactElement}
 */
const ItemCell = ({ image, disablePress = false, imageStyle, handlePress }: ItemCellPropsType) => {
	return (
		<Pressable
			disabled={disablePress}
			style={[
				styles.container,
			]}
			onPress={handlePress}
		>
			<Image source={image} style={[styles.image, imageStyle]} resizeMode="contain" />
		</Pressable>
	);
}

export default memo(ItemCell);

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: GlobalStyles.utils.mediumRadius.borderRadius,
		backgroundColor: GlobalStyles.colorPalette.primary[200],
		aspectRatio: 1 / 1,
	},
	image: {
		flex: 1,
		width: '100%',
	},
});