import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import LoginPage from './pages/LoginPage';
import GlobalStyles from './constants/GlobalStyles';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from './utils/StackNavigation';

export default function App() {
	return (
		<NavigationContainer>
			<View style={styles.container}>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Login" component={LoginPage} />
				</Stack.Navigator>
				<StatusBar style="auto" />
			</View>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colorPalette.background,
	},
});
