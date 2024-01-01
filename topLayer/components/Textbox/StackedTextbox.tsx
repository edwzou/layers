import { TextInput, StyleSheet, Text, Pressable } from 'react-native';
import React, { type ReactElement, useRef, useState } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';

interface StackedTextboxPropsType {
	label: string;
	value?: string;
	secure?: boolean;
	onFieldChange: (text: string) => void;
	autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const StackedTextBox = ({
	label,
	value,
	secure,
	onFieldChange,
	autoCapitalize = 'sentences',
}: StackedTextboxPropsType): ReactElement => {
	const [fieldText, setFieldText] = useState(value ?? '');
	const textRef = useRef<TextInput>(null);

	const handlePress = (): void => {
		if (textRef.current == null) return;
		textRef.current.focus();
	};

	return (
		<Pressable style={styles.container} onPress={handlePress}>
			<Text style={{ color: GlobalStyles.colorPalette.primary[400] }}>
				{label}
			</Text>
			<TextInput
				autoCapitalize={autoCapitalize}
				value={fieldText}
				onChangeText={(text) => {
					setFieldText(text);
					onFieldChange(text);
				}}
				secureTextEntry={secure}
				clearButtonMode="while-editing"
				ref={textRef}
			/>
		</Pressable>
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
