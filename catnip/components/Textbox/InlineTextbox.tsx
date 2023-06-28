import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import Icon from 'react-native-remix-icon';

type InlineTextboxType = {
	icon: string;
	secure?: boolean;
	placeholder: string;
	onFieldChange: (text: string) => void;
};

export default function InlineTextbox({
	icon,
	secure,
	placeholder,
	onFieldChange,
}: InlineTextboxType) {
	const [fieldText, setFieldText] = useState('');

	return (
		<View style={styles.container}>
			<Icon
				name={icon}
				size={20}
				color={GlobalStyles.colorPalette.primary[400]}
			/>
			<TextInput
				style={[styles.input, GlobalStyles.typography.body]}
				value={fieldText}
				secureTextEntry={secure || false}
				onChangeText={(text) => {
					setFieldText(text);
					onFieldChange(text); // Returns text value to parent component
				}}
				placeholder={placeholder}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: GlobalStyles.colorPalette.primary[200],
		padding: 10,
		borderRadius: GlobalStyles.utils.roundedRadius.borderRadius,
		display: 'flex',
		gap: 10,
		flexDirection: 'row',
		alignContent: 'center',
	},
	input: {
		color: GlobalStyles.colorPalette.primary[500],
		width: '100%',
	},
});
