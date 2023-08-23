import React, { useState } from 'react';
import { SafeAreaView, Pressable } from 'react-native';
import Icon from 'react-native-remix-icon';

import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import { Stack } from '../../utils/StackNavigation';

import Profile from './Profile';
import FeedbackPage from '../Feedback/FeedbackPage';
import SignUpPage from '../../pages/SignUp/SignUpPage';
import ItemView from '../../pages/ItemView/ItemView'
import { headerRight } from '../../components/Modal/HeaderRight';
import { NavigationContainer } from '@react-navigation/native';
import GlobalStyles from '../../constants/GlobalStyles';

import { UserClothing } from 'pages/Match';

const ProfilePage = () => {

	const [selectedItem, setSelectedItem] = useState<UserClothing>({} as UserClothing)

	const ProfileComponent = () => (<Profile selectedItem={selectedItem} setSelectedItem={setSelectedItem} isForeignProfile={false} />)
	const SettingsComponent = () => (<SignUpPage settings={true} />)
	const ItemViewComponent = () => (<ItemView clothingItem={selectedItem} />)

	return (
		<SafeAreaView style={{ flex: 1 }}>
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
							component={ItemViewComponent}
							options={{
								headerTitle: selectedItem.title,
							}}
						/>
					</Stack.Group>
					{/* <ColorTagsContext.Provider value={colorTags}>
						
						<GeneralModal
							ref={itemViewRef}
							content={<ItemView clothingItem={selectedItem} />}
							title={selectedItem.title}
							stepOver={{
								type: StepOverTypes.edit,
								handlePress: () => {
									editClothingRef.current?.scrollTo(highTranslateY);
								},
							}}
						/>
						<GeneralModal
							ref={editClothingRef}
							content={<EditClothing />}
							title="Edit"
							stepOver={{
								type: StepOverTypes.done,
								handlePress: () => {

								},
							}}
						/>
						<GeneralModal
							ref={outfitViewRef}
							content={<OutfitView />}
							title="Friday night fit"
							stepOver={{
								type: StepOverTypes.edit,
								handlePress: () => {
									outfitEditRef.current?.scrollTo(highTranslateY);
								},
							}}
						/>
						<GeneralModal
							ref={outfitEditRef}
							content={<OutfitEdit />}
							title="Edit"
							back
							stepOver={{
								type: StepOverTypes.done,
								handlePress: () => {
									console.log('some request');
									outfitEditRef.current?.scrollTo(0);
									outfitViewRef.current?.scrollTo(0);
								},
							}}
						/>
					</ColorTagsContext.Provider> */}
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
};

export default ProfilePage;
