import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from './utils/StackNavigation';
import { StackNavigation } from './constants/Enums';

import GlobalStyles from './constants/GlobalStyles';

import SignInPage from './pages/SignIn/SignInPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import OutfitPreviewPage from './pages/OutfitPreview/OutfitPreviewPage';
import Match from './pages/Match/Match';
import ProfilePage from './pages/Profile/ProfilePage';

export default function App() {
	return (
		<NavigationContainer>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SafeAreaView style={styles.container}>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name={StackNavigation.Login} component={SignInPage} />
						<Stack.Screen
							name={StackNavigation.OutfitPreview}
							component={OutfitPreviewPage}
						/>
						<Stack.Screen
							name={StackNavigation.SignUp}
							component={SignUpPage}
						/>
						<Stack.Screen name={StackNavigation.Match} component={Match} />
						<Stack.Screen name={StackNavigation.Profile} component={ProfilePage} />
					</Stack.Navigator>
					<ExpoStatusBar style="auto" />
				</SafeAreaView>
			</GestureHandlerRootView>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colorPalette.background,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
	},
});
