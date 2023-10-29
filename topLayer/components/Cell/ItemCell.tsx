import React, { memo } from 'react';
import { Image, type ImageStyle, Pressable, StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';

interface ItemCellPropsType {
	image: any; // !!! Replace 'any' with 'string'
	disablePress?: boolean;
	imageStyle?: ImageStyle;
	onPress?: () => void;
	base64?: boolean;
}

const ItemCell = ({
	image,
	disablePress = false,
	imageStyle,
	onPress,
	base64,
}: ItemCellPropsType) => {
	const img = base64 ? `data:image/jpg;base64,${image}` : image;
	return (
		<Pressable
			disabled={disablePress}
			style={[styles.container]}
			onPress={onPress}
		>
			{base64 ? (
				<Image
					source={{ uri: `data:image/jpg;base64,${image}` }}
					style={[styles.image, imageStyle]}
					resizeMode="cover"
				/>
			) : (
				<Image
					source={img}
					style={[styles.image, imageStyle]}
					resizeMode="cover"
				/>
			)}
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
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: GlobalStyles.utils.mediumRadius.borderRadius,
		backgroundColor: GlobalStyles.colorPalette.primary[200],
		flex: 1,
		width: '100%',
	},
});
