import React, {
	useState,
	useContext,
	createContext,
	Dispatch,
	SetStateAction,
} from 'react';

import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import { Stack } from '../../utils/StackNavigation';

import Profile from './Profile';
import FeedbackPage from '../Feedback/FeedbackPage';
import SettingsPage from './SettingsPage';
import ItemViewPage from '../../pages/ItemView/ItemViewPage';
import OutfitViewPage from '../../pages/OutfitView/OutfitViewPage';
import { headerButton } from '../../components/Modal/HeaderButton';
import { NavigationContainer } from '@react-navigation/native';
import GlobalStyles from '../../constants/GlobalStyles';
import { UserContext } from '../../utils/UserContext';
import {
	FieldErrors,
	UseFormHandleSubmit,
	UseFormSetValue,
	useForm,
} from 'react-hook-form';
import { User } from '../../pages/Main';

import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';
import { Control } from 'react-hook-form';
import { AppContext } from '../../App';
import CameraWrapper from '../../components/Camera/CameraWrapper';

import Toast from 'react-native-toast-message';
import { toast } from '../../constants/GlobalStrings';

// Define the context type
type ProfilePageContextType = {
	pfpUrl: string;
	setPfpUrl: Dispatch<SetStateAction<string>>;
};

// Create the context with the defined type
export const ProfilePageContext = createContext<ProfilePageContextType>({
	pfpUrl: '',
	setPfpUrl: () => { },
});

const ProfilePage = () => {

	const { data } = useContext(UserContext);
	const { pp_url } = data as User;
	const [pfpUrl, setPfpUrl] = useState(pp_url)

	return (
		<ProfilePageContext.Provider
			value={{
				pfpUrl,
				setPfpUrl,
			}}
		>
			<NavigationContainer independent={true}>
				<Stack.Navigator>
					<Stack.Screen
						options={{
							headerShown: false,
						}}
						name={StackNavigation.Profile}
						component={Profile}
					/>
					<Stack.Group
						screenOptions={{
							presentation: 'modal',
							headerTitleStyle: GlobalStyles.typography.subtitle,
							headerStyle: {
								backgroundColor: GlobalStyles.colorPalette.background,
							},
							headerShadowVisible: false,
						}}
					>
						<Stack.Screen
							name={StackNavigation.Feedback}
							component={FeedbackPage}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name={StackNavigation.Settings}
							component={SettingsPage}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name={StackNavigation.ItemView}
							component={ItemViewPage}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name={StackNavigation.OutfitView}
							component={OutfitViewPage}
							options={{
								headerShown: false,
							}}
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
					</Stack.Group>
				</Stack.Navigator>
			</NavigationContainer>
		</ProfilePageContext.Provider>
	);
};

export default ProfilePage;
