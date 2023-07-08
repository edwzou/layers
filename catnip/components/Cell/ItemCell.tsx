import React from 'react';
import { Image, Pressable, Dimensions } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';

type ItemCellPropsType = {
	image: any;
	size?: number;
};

export default function ItemCell({ image, size }: ItemCellPropsType) {
	return (
		<Pressable
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: 20,
				height: size || '100%',
				width: size || '100%',
				aspectRatio: 1 / 1,
				backgroundColor: GlobalStyles.colorPalette.primary[200],
			}}
			onPress={() => {
				console.log('Do something');
			}}
		>
			<Image source={image} resizeMode='contain' />
		</Pressable>
	);
}
