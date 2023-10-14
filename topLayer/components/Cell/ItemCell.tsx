import React, { memo } from 'react';
import {
	Image,
	type ImageStyle,
	Pressable,
	StyleSheet,
	View,
} from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import Icon from 'react-native-remix-icon';

interface ItemCellPropsType {
	imageUrl: string; // !!! Replace 'any' with 'string'
	disablePress?: boolean;
	imageStyle?: ImageStyle;
	onPress?: () => void;
	// canDelete?: boolean; // New boolean prop for deletable button
}

/**
 * Cells for items
 * * NOTE: wrap cells in a wrapper to adjust size; ItemCell fills the wrapper *
 * @param {string} image - Item image
 * @param {boolean} disablePress - Disables Pressable functionality
 * @param {ImageStyle} imageStyle - Custom image styling
 * @param {boolean} canDelete - Whether the delete button is shown
 * @function onPress
 * @returns {ReactElement}
 */
const ItemCell = ({
	imageUrl,
	disablePress = false,
	imageStyle,
	onPress,
	// canDelete,
}: ItemCellPropsType) => {

	// const handleDeletePress = () => {
	// 	console.log('delete button pressed');
	// };

	return (
		<Pressable disabled={disablePress} style={[styles.container]} onPress={onPress}>
			<Image source={{ uri: imageUrl }} style={[styles.image, imageStyle]} resizeMode="contain" />
			{/* {canDelete && (
				<View style={styles.deleteButtonContainer}>
					<Pressable onPress={handleDeletePress}>
						<View style={styles.deleteButton}>
							<Icon
								name={GlobalStyles.icons.closeOutline}
								color={GlobalStyles.colorPalette.background}
								size={GlobalStyles.sizing.icon.small}
							/>
						</View>
					</Pressable>
				</View>
			)} */}
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
		position: 'relative',
	},
	image: {
		flex: 1,
		width: '100%',
	},
	// deleteButtonContainer: {
	// 	position: 'absolute',
	// 	top: -6,
	// 	right: -6,
	// },
	// deleteButton: {
	// 	width: 21,
	// 	height: 21,
	// 	...GlobalStyles.utils.fullRadius,
	// 	backgroundColor: GlobalStyles.colorPalette.primary[300],
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// },
});
