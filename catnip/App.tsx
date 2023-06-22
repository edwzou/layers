import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from './constants/GlobalStyles';
import Textbox from './components/Textbox';
import { useState } from 'react';

export default function App() {
	// Testing return value from Textbox component
	const [text, setText] = useState('');
	const onInputChange = (text: string) => {
		setText(text);
	};

	return (
		<View style={styles.container}>
			<Text style={[GlobalStyles.typography.header, GlobalStyles.utils.font]}>
				Catwalk
			</Text>
			<Textbox onFieldChange={onInputChange} label="YEET" />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colorPalette.background,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
