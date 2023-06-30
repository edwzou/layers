import React from 'react';
import { Image, Pressable } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';

type ItemCellPropsType = {
	image: HTMLImageElement;
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
				backgroundColor: GlobalStyles.colorPalette.primary[200],
			}}
			onPress={() => {
				console.log('Do something');
			}}
		>
			<Image source={image} />
		</Pressable>
	);
}
