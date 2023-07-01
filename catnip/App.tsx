import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Stack, StackNavigation } from './utils/StackNavigation';

import GlobalStyles from './constants/GlobalStyles';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import OutfitPreviewPage from './pages/OutfitPreview/OutfitPreviewPage';

export default function App() {
	return (
		<NavigationContainer>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<View style={styles.container}>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name={StackNavigation.Login} component={LoginPage} />
						<Stack.Screen
							name={StackNavigation.OutfitPreview}
							component={OutfitPreviewPage}
						/>
						<Stack.Screen
							name={StackNavigation.SignUp}
							component={SignUpPage}
						/>
					</Stack.Navigator>
					<StatusBar style="auto" />
				</View>
			</GestureHandlerRootView>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colorPalette.background,
	},
});
