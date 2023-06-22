import { View, TextInput, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../constants/GlobalStyles';

type TextboxPropsType = {
	label: string;
	onFieldChange: (text: string) => void;
};

export default function Textbox({ label, onFieldChange }: TextboxPropsType) {
	const [fieldText, setFieldText] = useState('');
	return (
		<View style={{ width: '100%' }}>
			<View style={styles.view}>
				<Text style={[styles.label, GlobalStyles.typography.body2]}>
					{label}
				</Text>
			</View>
			<TextInput
				style={[styles.input, GlobalStyles.typography.body]}
				value={fieldText}
				onChangeText={(text) => {
					setFieldText(text);
					onFieldChange(text); // Returns text value to parent component
				}}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	label: {
		color: GlobalStyles.colorPalette.primary[400],
	},
	view: {
		backgroundColor: GlobalStyles.colorPalette.primary[200],
		paddingTop: 10,
		paddingHorizontal: 10,
		borderTopStartRadius: 10,
		borderTopEndRadius: 10,
		paddingBottom: 5,
	},
	input: {
		backgroundColor: GlobalStyles.colorPalette.primary[200],
		width: '100%',
		paddingBottom: 10,
		paddingHorizontal: 10,
		borderBottomStartRadius: 10,
		borderBottomEndRadius: 10,
		color: GlobalStyles.colorPalette.primary[500],
	},
});
