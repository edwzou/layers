import React, {
	useState,
	useContext,
	createContext,
	type Dispatch,
	type SetStateAction,
} from 'react';

import { StackNavigation } from '../../constants/Enums';
import { Stack } from '../../utils/StackNavigation';

import Profile from './Profile';
import FeedbackPage from '../Feedback/FeedbackPage';
import SettingsPage from './SettingsPage';
import ItemViewPage from '../../pages/ItemView/ItemViewPage';
import OutfitViewPage from '../../pages/OutfitView/OutfitViewPage';
import { NavigationContainer } from '@react-navigation/native';
import GlobalStyles from '../../constants/GlobalStyles';
import { UserContext } from '../../utils/UserContext';
import { type User } from '../../pages/Main';

import CameraWrapper from '../../components/Camera/CameraWrapper';

// Define the context type
interface ProfilePageContextType {
	pfpUrlForSettings: string;
	setReturnToPfp: Dispatch<SetStateAction<boolean>>;
}

// Create the context with the defined type
export const ProfilePageContext = createContext<ProfilePageContextType>({
	pfpUrlForSettings: '',
	setReturnToPfp: () => {},
});

const ProfilePage: React.FC = () => {
	const { data } = useContext(UserContext);
	const { pp_url } = data as User;
	const [pfpUrlForSettings, setPfpUrlForSettings] = useState(pp_url);
	const [returnToPfp, setReturnToPfp] = useState(false);

	const CameraWrapperComponent: React.FC = () => (
		<CameraWrapper setPfpUrl={setPfpUrlForSettings} returnToPfp={returnToPfp} />
	);

	return (
		<ProfilePageContext.Provider
			value={{
				pfpUrlForSettings,
				setReturnToPfp,
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
							component={CameraWrapperComponent}
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
