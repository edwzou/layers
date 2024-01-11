import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import React, { type ReactElement } from 'react';

interface ButtonPropsType {
	text: string;
	onPress: (data: any) => void;
	disabled?: boolean;
	style?: ViewStyle;
	bgColor: string;
}

const Button = ({
	text,
	onPress,
	style,
	disabled = false,
	bgColor,
}: ButtonPropsType): ReactElement => {
	return (
		<Pressable
			style={[
				styles.button,
				style != null ? style : null,
				{
					backgroundColor: disabled
						? GlobalStyles.colorPalette.primary[200]
						: bgColor,
					shadowColor: disabled
						? GlobalStyles.colorPalette.primary[200]
						: bgColor,
				},
				GlobalStyles.utils.buttonShadow,
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
		...GlobalStyles.utils.buttonShape,
		...GlobalStyles.utils.buttonShadow,
	},
	text: {
		...GlobalStyles.typography.body,
	},
});
