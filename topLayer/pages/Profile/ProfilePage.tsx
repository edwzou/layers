import React, { useState, createContext } from 'react';
import { SafeAreaView } from 'react-native';

import { StackNavigation, StepOverTypes, ColorTags } from '../../constants/Enums';
import { Stack } from '../../utils/StackNavigation';

import Profile from './Profile';
import FeedbackPage from '../Feedback/FeedbackPage';
import SignUpPage from '../../pages/SignUp/SignUpPage';
import ItemViewPage from '../../pages/ItemView/ItemViewPage'
import OutfitViewPage from '../../pages/OutfitView/OutfitViewPage';
import { headerRight } from '../../components/Modal/HeaderRight';
import { NavigationContainer } from '@react-navigation/native';
import GlobalStyles from '../../constants/GlobalStyles';

import { UserClothing } from '../../pages/Match';
import { UserOutfit } from '../../pages/OutfitEdit'

import { colorTags } from '../../constants/testData';

export const ColorTagsContext = createContext([ColorTags.Blue]);

const ProfilePage = () => {

	const [selectedItem, setSelectedItem] = useState<UserClothing>({} as UserClothing)
	const [selectedOutfit, setSelectedOutfit] = useState<UserOutfit>({} as UserOutfit)

	const ProfileComponent = () => (<Profile
		selectedItem={selectedItem}
		setSelectedItem={setSelectedItem}
		selectedOutfit={selectedOutfit}
		setSelectedOutfit={setSelectedOutfit}
		isForeignProfile={false} />)
	const SettingsComponent = () => (<SignUpPage settings={true} />)
	const ItemViewPageComponent = () => (<ItemViewPage selectedItem={selectedItem} />)
	const OutfitViewPageComponent = () => (<OutfitViewPage selectedOutfit={selectedOutfit} />)

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ColorTagsContext.Provider value={colorTags}>
				<NavigationContainer
					independent={true}>
					<Stack.Navigator>
						<Stack.Screen
							options={{
								headerShown: false,
							}}
							name={StackNavigation.Profile}
							component={ProfileComponent}
						/>
						<Stack.Group
							screenOptions={{
								presentation: 'modal',
								headerTitleStyle: GlobalStyles.typography.subtitle,
								headerStyle: {
									backgroundColor: GlobalStyles.colorPalette.background,
								},
								headerShadowVisible: false,
							}}>
							<Stack.Screen
								name={StackNavigation.Feedback}
								component={FeedbackPage}
								options={{
									headerRight: () => headerRight({
										type: StepOverTypes.send,
										handlePress: () => {
											console.log("Hello")
										},
									}),
								}}
							/>
							<Stack.Screen
								name={StackNavigation.Settings}
								component={SettingsComponent}
								options={{
									headerRight: () => headerRight({
										type: StepOverTypes.update,
										handlePress: () => {
											console.log("Hello")
										},
									}),
								}}
							/>
							<Stack.Screen
								name={StackNavigation.ItemView}
								component={ItemViewPageComponent}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name={StackNavigation.OutfitView}
								component={OutfitViewPageComponent}
								options={{
									headerShown: false,
								}}
							/>
						</Stack.Group>
					</Stack.Navigator>
				</NavigationContainer>
			</ColorTagsContext.Provider>
		</SafeAreaView>
	);
};

export default ProfilePage;
