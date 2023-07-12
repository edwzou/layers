import React from 'react';
import { Image, ImageStyle, Pressable, StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';

type ItemCellPropsType = {
	image: any; // Replace 'any' with appropriate type for your image source
	size?: number | undefined; // Update the prop type
	disablePress?: boolean;
	imageStyle?: ImageStyle;
	handlePress?: () => void;
};

export default function ItemCell({ image, size, disablePress = false, imageStyle, handlePress }: ItemCellPropsType) {
	return (
		<Pressable
			disabled={disablePress}
			style={[
				styles.container,
				{ height: size || '100%', width: size || '100%' }
			]}
			onPress={() => {
				console.log('ItemCell tapped');
			}}
		>
			<Image source={image} style={[styles.image, imageStyle]} resizeMode="contain" />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
		backgroundColor: GlobalStyles.colorPalette.primary[200],
	},
	image: {
		flex: 1,
	},
});
