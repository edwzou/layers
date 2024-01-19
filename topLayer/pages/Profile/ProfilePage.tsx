import React from 'react';
import { StackNavigation } from '../../constants/Enums';
import { Stack } from '../../utils/StackNavigation';
import Profile from './Profile';
import SettingsPage from './SettingsPage';
import { NavigationContainer } from '@react-navigation/native';
import ItemCamera from '../../components/Camera/ItemCamera';
import CameraPfp from '../../components/Camera/CameraPfp';
import OutfitPage from '../OutfitView/OutfitPage';
import ItemPage from '../../pages/ItemView/ItemPage';

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
						headerShown: false,
					}}
				>
					<Stack.Screen
						name={StackNavigation.Settings}
						component={SettingsPage}
					/>
					<Stack.Screen name={StackNavigation.ItemPage} component={ItemPage} />
					<Stack.Screen
						name={StackNavigation.OutfitPage}
						component={OutfitPage}
					/>
					<Stack.Group
						screenOptions={{
							presentation: 'fullScreenModal',
							animation: 'slide_from_bottom',
							gestureEnabled: true,
							gestureDirection: 'vertical',
						}}
					>
						<Stack.Screen
							name={StackNavigation.ItemCamera}
							component={ItemCamera}
						/>
						<Stack.Screen
							name={StackNavigation.CameraPfp}
							component={CameraPfp}
						/>
					</Stack.Group>
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default ProfilePage;
