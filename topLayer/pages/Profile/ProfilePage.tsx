import React, { useState } from 'react';

import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import { Stack } from '../../utils/StackNavigation';

import Profile from './Profile';
import FeedbackPage from '../Feedback/FeedbackPage';
import SettingsPage from './SettingsPage';
import ItemViewPage from '../../pages/ItemView/ItemViewPage';
import OutfitViewPage from '../../pages/OutfitView/OutfitViewPage';
import { headerRight } from '../../components/Modal/HeaderRight';
import { NavigationContainer } from '@react-navigation/native';
import GlobalStyles from '../../constants/GlobalStyles';

const ProfilePage = () => {
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
							headerRight: () =>
								headerRight({
									type: StepOverTypes.send,
									handlePress: () => {
										console.log('Hello');
									},
								}),
						}}
					/>
					<Stack.Screen
						name={StackNavigation.Settings}
						component={SettingsPage}
						options={{
							headerRight: () =>
								headerRight({
									type: StepOverTypes.update,
									handlePress: () => {
										console.log('Hello');
									},
								}),
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
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default ProfilePage;
