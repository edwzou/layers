import { StyleSheet, StatusBar, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import React, {
	type Dispatch,
	type SetStateAction,
	createContext,
	useEffect,
	useState,
} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Stack } from '../utils/StackNavigation';
import { StackNavigation } from '../constants/Enums';
import { navigationRef } from '../RootNavigation';

import SignInPage from '../pages/SignIn/SignInPage';
import SignUpPage from '../pages/SignUp/SignUpPage';
import MainPage from '../pages/Main/MainPage';

import GlobalStyles from '../constants/GlobalStyles';
import CameraWrapper from '../components/Camera/CameraWrapper';
import { UserContext } from '../utils/UserContext';
import { type User } from '../pages/Main/UserTypes';
import Toast from 'react-native-toast-message';
import { useUpdateUser, useUser } from 'Contexts/UserContext';
import { getUser } from '../endpoints/getUser';

export const AppContext = createContext({
	setShouldRefreshApp: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

const AppHome: React.FC = () => {
	const [shouldRefreshApp, setShouldRefreshApp] = useState(false);

	const [user, setUser] = useState<User | null>(null);
	const userContextValue = {
		data: user,
		updateData: (user: any) => {
			setUser(user);
		},
	};

	useEffect(() => {
		void getUser(setUser);
	}, []);
	// refetches user after updating info in settings
	useEffect(() => {
		if (shouldRefreshApp) {
			void getUser(setUser);
			setShouldRefreshApp(false);
		}
	}, [shouldRefreshApp]);

	const [pfpUrlForSignUp, setPfpUrlForSignUp] = useState('');

	const SignUpPageComponent: React.FC = () => (
		<SignUpPage pfpUrlForSignUp={pfpUrlForSignUp} />
	);

	const CameraWrapperComponent: React.FC = () => (
		<CameraWrapper setPfpUrl={setPfpUrlForSignUp} returnToPfp={true} />
	);

	return (
		<AppContext.Provider
			value={{
				setShouldRefreshApp: setShouldRefreshApp,
			}}
		>
			<NavigationContainer ref={navigationRef}>
				<View style={styles.container}>
					<UserContext.Provider value={userContextValue}>
						<Stack.Navigator
							screenOptions={{
								headerShown: false,
							}}
						>
							{user === null || user === undefined ? (
								<>
									<Stack.Screen
										name={StackNavigation.Login}
										component={SignInPage}
									/>
									<Stack.Screen
										name={StackNavigation.SignUp}
										component={SignUpPageComponent}
									/>
									<Stack.Screen
										name={StackNavigation.CameraWrapper}
										component={CameraWrapperComponent}
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
						</Stack.Navigator>
						<ExpoStatusBar style="auto" />
					</UserContext.Provider>
				</View>
			</NavigationContainer>
			<Toast />
		</AppContext.Provider>
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
