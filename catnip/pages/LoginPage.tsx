import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation, StackTypes } from '../utils/StackNavigation';

import GlobalStyles from '../constants/GlobalStyles';
import InlineTextbox from '../components/Textbox/InlineTextbox';

export default function LoginPage() {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const [text, setText] = useState('');
	const onInputChange = (text: string) => {
		setText(text);
	};

	return (
		<View style={styles.container}>
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
					icon={GlobalStyles.icons.passwordOutline}
					placeholder="Password"
					secure={true}
					onFieldChange={onInputChange}
				/>
			</View>
			<Pressable
				style={[
					styles.button,
					GlobalStyles.utils.smallRadius,
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
			<Text>
				Don't have an account?{' '}
				<Text
					onPress={() => {
						navigation.navigate(StackNavigation.SignUp);
					}}
					style={{ color: GlobalStyles.colorPalette.info[500] }}
				>
					Sign up
				</Text>
			</Text>
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
		marginHorizontal: GlobalStyles.layout.xGap,
	},
	button: {
		backgroundColor: GlobalStyles.colorPalette.primary[500],
		paddingHorizontal: 16,
		paddingVertical: 5,
	},
});
