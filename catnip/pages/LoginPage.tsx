import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../constants/GlobalStyles';
import InlineTextbox from '../components/Textbox/InlineTextbox';

export default function LoginPage() {
	const [text, setText] = useState('');
	const onInputChange = (text: string) => {
		setText(text);
	};

	return (
		<View style={[styles.container, GlobalStyles.layout.xMargin]}>
			<Text style={[GlobalStyles.typography.header, GlobalStyles.utils.font]}>
				Catwalk
			</Text>
			<View style={{ gap: 20 }}>
				<InlineTextbox
					icon={GlobalStyles.icons.userOutline}
					placeholder="Username"
					onFieldChange={onInputChange}
				/>
				<InlineTextbox
					icon={GlobalStyles.icons.password}
					placeholder="Password"
					onFieldChange={onInputChange}
				/>
			</View>
			<Pressable
				style={[
					styles.button,
					GlobalStyles.utils.roundedRadius,
					GlobalStyles.utils.shadow,
				]}
				onPress={() => {
					console.log('!!! Add Logic');
				}}
			>
				<Text style={{ color: GlobalStyles.colorPalette.background }}>
					Sign in
				</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
		gap: 65,
	},
	button: {
		backgroundColor: GlobalStyles.colorPalette.primary[500],
		paddingHorizontal: 16,
		paddingVertical: 5,
	},
});
