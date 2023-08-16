import { StyleSheet, StatusBar, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Stack } from './utils/StackNavigation';
import { StackNavigation } from './constants/Enums';

import SignInPage from './pages/SignIn/SignInPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import MainPage from './pages/Main/MainPage';

import GlobalStyles from './constants/GlobalStyles';
import CameraWrapper from './components/Camera/CameraWrapper';
import axios from 'axios';
import { baseUrl } from './utils/apiUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
	const [user, setUser] = useState<string | null>(null); //!!! Fix any type

	useEffect(() => {
		const getUser = async () => {
			try {
				const value = await AsyncStorage.getItem('session');
				if (!value) { return }

				setUser(value);
			} catch (error) {
				console.log(error)
			}
		}

		void getUser();
	}, [user])

	console.log(user);

	return (
		<NavigationContainer>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<View style={styles.container}>
					<Stack.Navigator
						screenOptions={{
							headerShown: false,
							gestureEnabled: true,
							gestureDirection: 'horizontal',
						}}
					>
						{user === null ? (
							<>
								<Stack.Screen
									name={StackNavigation.Login}
									component={SignInPage}
								/>
								<Stack.Screen
									name={StackNavigation.SignUp}
									component={SignUpPage}
								/>
							</>
						) : (
							<>
								<Stack.Screen
									name={StackNavigation.Main}
									component={MainPage}
								/>
							</>
						)}
						<Stack.Screen
							name={StackNavigation.Camera}
							component={CameraWrapper}
							options={{
								animation: 'slide_from_bottom',
								gestureEnabled: true,
								gestureDirection: 'vertical',
							}}
						/>
					</Stack.Navigator>
					<ExpoStatusBar style="auto" />
				</View>
			</GestureHandlerRootView>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colorPalette.background,
		paddingTop: Device.osName === 'Android' ? StatusBar.currentHeight : 0,
	},
});
