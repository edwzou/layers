import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import React from 'react';

interface ButtonPropsType {
	text: string;
	onPress: (data: any) => void;
	disabled?: boolean;
	style?: ViewStyle;
	bgColor: any; // !!! fix any type
}

const Button = ({
	text,
	onPress,
	style,
	disabled = false,
	bgColor,
}: ButtonPropsType) => {
	return (
		<Pressable
			style={[
				styles.button,
				GlobalStyles.utils.fullRadius,
				GlobalStyles.utils.tagShadow,
				style != null ? style : null,
				{
					backgroundColor: disabled
						? GlobalStyles.colorPalette.primary[200]
						: bgColor,
					shadowColor: disabled
						? GlobalStyles.colorPalette.primary[200]
						: bgColor,
					shadowOpacity: 0.23,
					shadowRadius: 5,
					shadowOffset: { width: 0, height: 0 },
				},
			]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text
				style={[
					styles.text,
					{
						color: disabled
							? GlobalStyles.colorPalette.primary[400]
							: GlobalStyles.colorPalette.background,
					},
				]}
			>
				{text}
			</Text>
		</Pressable>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: GlobalStyles.layout.xGap,
		paddingVertical: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		...GlobalStyles.typography.body,
	},
});
