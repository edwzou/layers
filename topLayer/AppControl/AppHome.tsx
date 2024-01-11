import { StyleSheet, StatusBar, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Stack } from '../utils/StackNavigation';
import { StackNavigation } from '../constants/Enums';
import { navigationRef } from '../Navigation/RootNavigation';

import SignInPage from '../pages/SignIn/SignInPage';
import SignUpPage from '../pages/SignUp/SignUpPage';
import MainPage from '../pages/Main/MainPage';

import GlobalStyles from '../constants/GlobalStyles';
import CameraWrapper from '../components/Camera/CameraWrapper';
import { type User } from '../types/User';
import Toast from 'react-native-toast-message';
import { useUser } from '../Contexts/UserContext';

const AppHome: React.FC = () => {
	const user: User = useUser();

	return (
		<NavigationContainer ref={navigationRef}>
			<View style={styles.container}>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					{user.uid === '' ? (
						<>
							<Stack.Screen
								name={StackNavigation.Login}
								component={SignInPage}
							/>
							<Stack.Screen
								name={StackNavigation.SignUp}
								component={SignUpPage}
							/>
							<Stack.Screen
								name={StackNavigation.CameraWrapper}
								component={CameraWrapper}
								options={{
									presentation: 'fullScreenModal',
									animation: 'slide_from_bottom',
									gestureEnabled: true,
									gestureDirection: 'vertical',
									headerShown: false,
								}}
							/>
						</>
					) : (
						<>
							<Stack.Screen name={StackNavigation.Main} component={MainPage} />
						</>
					)}
				</Stack.Navigator>
				<ExpoStatusBar style="auto" />
			</View>

			<Toast />
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colorPalette.background,
		paddingTop: Device.osName === 'Android' ? StatusBar.currentHeight : 0,
	},
});

export default AppHome;
