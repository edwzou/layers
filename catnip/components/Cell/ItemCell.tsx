import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';

type ItemCellPropsType = {
	image: any; // Replace 'any' with appropriate type for your image source
	size?: number | undefined; // Update the prop type
	disablePress: boolean,
	handlePress?: () => void;
};

export default function ItemCell({ image, size, disablePress, handlePress }: ItemCellPropsType) {
	return (
		<Pressable
			disabled={disablePress}
			style={[
				styles.container,
				{ height: size || '100%', width: size || '100%' }
			]}
			onPress={() => {
				console.log('Do something');
			}}
		>
			<Image source={image} style={styles.image} resizeMode="contain" />
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
		width: '85%',
		height: '85%',
	},
});
