import React, { memo } from 'react';
import { Image, type ImageStyle, Pressable, StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';

interface ItemCellPropsType {
	imageUrl: string; // !!! Replace 'any' with 'string'
	disablePress?: boolean;
	imageStyle?: ImageStyle;
	onPress?: () => void;
	base64?: boolean;
}

const ItemCell = ({
	imageUrl,
	disablePress = false,
	imageStyle,
	onPress,
	base64,
}: ItemCellPropsType) => {
	const img = base64 ? `data:image/jpg;base64,${image}` : image;
	return (
<<<<<<< HEAD
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
=======
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
>>>>>>> main
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
