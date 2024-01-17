import { TextInput, StyleSheet, Text, Pressable } from 'react-native';
import React, { type ReactElement, useRef, useState } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import { FontAwesome5 } from '@expo/vector-icons';

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
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
				// secureTextEntry={secure}
				secureTextEntry={(secure ?? false) && !isPasswordVisible}
				clearButtonMode="while-editing"
				ref={textRef}
			/>
			{(secure ?? false) && (
				<Pressable
					style={styles.eyeIcon}
					onPress={() => { setIsPasswordVisible(!isPasswordVisible); }}
				>
					<FontAwesome5
						name={isPasswordVisible ? 'eye' : 'eye-slash'}
						size={18}
						color={GlobalStyles.colorPalette.danger[600]}
					/>
				</Pressable>
			)}
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
	eyeIcon: {
		position: 'absolute',
		right: 10,
	},
});

export default StackedTextBox;
