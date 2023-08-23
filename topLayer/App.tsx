import { StyleSheet, StatusBar, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createContext, useContext, useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Stack } from './utils/StackNavigation';
import { StackNavigation } from './constants/Enums';
import { navigationRef } from './RootNavigation';

import SignInPage from './pages/SignIn/SignInPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import MainPage from './pages/Main/MainPage';

import GlobalStyles from './constants/GlobalStyles';
import CameraWrapper from './components/Camera/CameraWrapper';
import axios from 'axios';
import { baseUrl } from './utils/apiUtils';
import { UserContext } from './utils/UserContext';

export default function App() {

	const [user, setUser] = useState(null);

	const userContextValue = {
		data: user,
		updateData: (user: any) => {
			setUser(user);
		}
	}


	useEffect(() => { console.log("App: " + JSON.stringify(user)) }, [user])

	return (
		<NavigationContainer ref={navigationRef}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<View style={styles.container}>
					<UserContext.Provider value={userContextValue}>
						<Stack.Navigator
							screenOptions={{
								headerShown: false,
								gestureEnabled: true,
								gestureDirection: 'horizontal',
							}}

						>
							{!user ? (
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
					</UserContext.Provider>
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
