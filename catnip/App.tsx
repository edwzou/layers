import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from './constants/GlobalStyles';
import LikeIcon from './components/icons/LikeIcon';

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={[GlobalStyles.typography.header, GlobalStyles.utils.font]}>
				Catwalk
			</Text>
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
