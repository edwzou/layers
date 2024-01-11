import React, {
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
	return (
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
	);
};

export default ProfilePage;
