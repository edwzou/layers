import React, { memo } from 'react';
import { Image, type ImageStyle, Pressable, StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';

interface ItemCellPropsType {
	image: any; // !!! Replace 'any' with 'string'
	disablePress?: boolean;
	imageStyle?: ImageStyle;
	onPress?: () => void;
}

/**
 * Cells for items
 * * NOTE: wrap cells in a wrapper to adjust size; ItemCell fills the wrapper *
 * @param {string} image - Item image
 * @param {boolean} disablePress - Disables Pressable functionality
 * @param {ImageStyle} imageStyle - Custom image styling
 * @function onPress
 * @returns {ReactElement}
 */
const ItemCell = ({
	image,
	disablePress = false,
	imageStyle,
	onPress,
}: ItemCellPropsType) => {
	return (
		<Pressable
			disabled={disablePress}
			style={[styles.container]}
			onPress={onPress}
		>
			<Image
				source={image}
				style={[styles.image, imageStyle]}
				resizeMode="contain"
			/>
		</Pressable>
	);
};

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
