import {
	View,
	TextInput,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	Pressable,
} from 'react-native';
import React, { useState, useRef } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';

interface StackedTextboxPropsType {
	placeholder: string;
	value?: string;
	onFieldChange: (text: string) => void;
}

const SquareTextbox = ({
	placeholder,
	value,
	onFieldChange,
}: StackedTextboxPropsType) => {
	const [fieldText, setFieldText] = useState(value || '');
	const textInputRef = useRef<TextInput | null>(null);

	const handlePress = () => {
		if (textInputRef.current != null) {
			textInputRef.current.focus();
		}
	};

	return (
		<Pressable style={styles.container} onPress={handlePress}>
			<TextInput
				ref={textInputRef}
				style={[styles.input, GlobalStyles.typography.paragraph]}
				value={fieldText}
				onChangeText={(text) => {
					setFieldText(text);
					onFieldChange(text);
				}}
				multiline={true}
				placeholder={placeholder}
			/>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		aspectRatio: 1,
		backgroundColor: GlobalStyles.colorPalette.primary[200],
		padding: 10,
		borderRadius: GlobalStyles.utils.smallRadius.borderRadius,
	},
	input: {
		color: GlobalStyles.colorPalette.primary[500],
	},
});

export default SquareTextbox;
