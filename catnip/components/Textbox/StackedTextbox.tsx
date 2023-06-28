import { View, TextInput, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';

type StackedTextboxPropsType = {
	label: string;
	onFieldChange: (text: string) => void;
};

export default function StackedTextbox({
	label,
	onFieldChange,
}: StackedTextboxPropsType) {
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
		borderTopStartRadius: GlobalStyles.utils.smallRadius.borderRadius,
		borderTopEndRadius: GlobalStyles.utils.smallRadius.borderRadius,
		paddingBottom: 5,
	},
	input: {
		backgroundColor: GlobalStyles.colorPalette.primary[200],
		width: '100%',
		paddingBottom: 10,
		paddingHorizontal: 10,
		borderBottomStartRadius: GlobalStyles.utils.smallRadius.borderRadius,
		borderBottomEndRadius: GlobalStyles.utils.smallRadius.borderRadius,
		color: GlobalStyles.colorPalette.primary[500],
	},
});
