import { View, TextInput, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';

type StackedTextboxPropsType = {
	label: string;
	value?: string;
	secure?: boolean;
	onFieldChange: (text: string) => void;
};

const StackedTextBox = ({
	label,
	value,
	secure,
	onFieldChange,
}: StackedTextboxPropsType) => {
	const [fieldText, setFieldText] = useState(value || '');

	return (
		<View style={styles.container}>
			<Text style={{ color: GlobalStyles.colorPalette.primary[400] }}>
				{label}
			</Text>
			<TextInput
				value={fieldText}
				onChangeText={(text) => {
					setFieldText(text);
					onFieldChange(text);
				}}
				secureTextEntry={secure || false}
				clearButtonMode="while-editing"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: GlobalStyles.colorPalette.primary[200],
		padding: 10,
		borderRadius: GlobalStyles.utils.smallRadius.borderRadius,
		color: GlobalStyles.colorPalette.primary[500],
		gap: 5,
	},
});

export default StackedTextBox;
