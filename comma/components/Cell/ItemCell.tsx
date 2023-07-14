import React, { memo } from 'react';
import { Image, ImageStyle, Pressable, StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';

type ItemCellPropsType = {
	image: any; // Replace 'any' with appropriate type for your image source
	size?: number | undefined; // Update the prop type
	disablePress?: boolean;
	imageStyle?: ImageStyle;
	handlePress?: () => void;
};

const ItemCell = ({ image, size, disablePress = false, imageStyle, handlePress }: ItemCellPropsType) => {
	return (
		<Pressable
			disabled={disablePress}
			style={[
				styles.container,
				{ height: size || '100%', width: size || '100%' }
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
		aspectRatio: 1 / 1
	},
	image: {
		flex: 1,
		width: '100%',
	},
});