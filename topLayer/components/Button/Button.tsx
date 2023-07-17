import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import React from 'react';

type ButtonPropsType = {
	text: string;
	onPress: (data: any) => void;
	disabled?: boolean;
	style?: ViewStyle
};

const Button = ({ text, onPress, style, disabled = false }: ButtonPropsType) => {
	return (
		<Pressable
			style={[
				styles.button,
				GlobalStyles.utils.smallRadius,
				GlobalStyles.utils.tagShadow,
				style ? style : null
				,
				{
					backgroundColor: disabled
						? GlobalStyles.colorPalette.primary[200]
						: GlobalStyles.colorPalette.primary[500],
				},
			]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text
				style={[styles.text, {
					color: disabled
						? GlobalStyles.colorPalette.primary[400]
						: GlobalStyles.colorPalette.background,
				}]}
			>
				{text}
			</Text>
		</Pressable>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 16,
		paddingVertical: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		...GlobalStyles.typography.body
	}
});