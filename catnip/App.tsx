import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import LoginPage from './pages/LoginPage';
import GlobalStyles from './constants/GlobalStyles';

export default function App() {
	return (
		<View style={styles.container}>
			<LoginPage />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colorPalette.background,
	},
});
