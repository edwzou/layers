import { StyleSheet, StatusBar, View, LogBox } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import {
	type Dispatch,
	type SetStateAction,
	createContext,
	useEffect,
	useState,
	type ReactElement,
} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Stack } from './utils/StackNavigation';
import { StackNavigation } from './constants/Enums';
import { navigationRef } from './RootNavigation';

import SignInPage from './pages/SignIn/SignInPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import MainPage from './pages/Main/MainPage';

import GlobalStyles from './constants/GlobalStyles';
import CameraWrapper from './components/Camera/CameraWrapper';
import { UserContext } from './utils/UserContext';
import axios from 'axios';
import { baseUrl } from './utils/apiUtils';
import { type User } from './pages/Main';
import Toast from 'react-native-toast-message';

LogBox.ignoreLogs(['Require cycle:']);
// ^ Ignores require cycle warnings. We decided to ignore these warnings for 2 reasons:
// 1. Require cycles are technically not errors. It's just React Native telling us that this is an area of potential danger (which we should keep in mind)
// 2. There's rarely a fix for require cycles, especially if it involves more than 2 components (which is our case)
LogBox.ignoreLogs(['Constants.platform.ios.model has been deprecated']);

export const AppContext = createContext({
	setShouldRefreshApp: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

export default function App(): ReactElement {
	const [shouldRefreshApp, setShouldRefreshApp] = useState(false);

	const [user, setUser] = useState<User | null>(null);

	const userContextValue = {
		data: user,
		updateData: (user: any) => {
			setUser(user);
		},
	};

	const getUser = async (): Promise<void> => {
		const { data, status } = await axios.get(`${baseUrl}/api/private/users`);

		if (status === 200) {
			setUser(data.data);
		} else {
			setUser(null);
		}
	};

	useEffect(() => {
		void getUser();
	}, []);

	// refetches user after updating info in settings
	useEffect(() => {
		if (shouldRefreshApp) {
			void getUser();
			setShouldRefreshApp(false);
		}
	}, [shouldRefreshApp]);

	const [pfpUrlForSignUp, setPfpUrlForSignUp] = useState('');

	const SignUpPageComponent = (): ReactElement => (
		<SignUpPage pfpUrlForSignUp={pfpUrlForSignUp} />
	);

	const CameraWrapperComponent = (): ReactElement => (
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
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colorPalette.background,
		paddingTop: Device.osName === 'Android' ? StatusBar.currentHeight : 0,
	},
});
