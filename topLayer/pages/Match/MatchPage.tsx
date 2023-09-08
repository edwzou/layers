import React, { useState, createContext } from 'react';
import { StyleSheet } from 'react-native';

import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import { Stack } from '../../utils/StackNavigation';

import { headerRight } from '../../components/Modal/HeaderRight';
import { NavigationContainer } from '@react-navigation/native';
import GlobalStyles from '../../constants/GlobalStyles';

import { baseUrl } from '../../utils/apiUtils';
import axios from 'axios';

import Match from './Match';
import OutfitPreview from '../../pages/OutfitPreview/OutfitPreview';

export const MatchPageContext = createContext({ setMatch: (_?: any) => { } });

const MatchPage = () => {

	const [match, setMatch] = useState({
		previewData: {
			outerwear: null,
			tops: null,
			bottoms: null,
			shoes: null
		},
		matchName: ''
	})

	const handleSubmitOutfit = async () => {
		const clothingItems = [
			match.previewData.outerwear,
			match.previewData.tops,
			match.previewData.bottoms,
			match.previewData.shoes,
		].filter(Boolean);

		try {
			const response = await axios.post(`${baseUrl}/outfits`, {
				title: match.matchName,
				clothing_items: clothingItems,
				uid: 'a45ab439-0dce-448a-9126-43f32f8d56c8', // !!! change to real UID
			});

			if (response.status === 201) {
				alert(`You have created: ${JSON.stringify(response.data)}`);
			} else {
				throw new Error('An error has occurred');
			}
		} catch (error) {
			alert(error);
		}
	};

	return (
		<MatchPageContext.Provider value={{ setMatch }}>
			<NavigationContainer
				independent={true}>
				<Stack.Navigator>
					<Stack.Screen
						options={{
							headerShown: false,
						}}
						name={StackNavigation.Match}
						component={Match}
					/>
					<Stack.Screen
						options={{
							presentation: 'modal',
							headerTitleStyle: GlobalStyles.typography.subtitle,
							headerStyle: {
								backgroundColor: GlobalStyles.colorPalette.background,
							},
							headerShadowVisible: false,
							headerRight: () => headerRight({
								type: StepOverTypes.done,
								handlePress: handleSubmitOutfit,
							}),
						}}
						name={StackNavigation.OutfitPreview}
						component={OutfitPreview}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</MatchPageContext.Provider>
	)
}

export default MatchPage

const styles = StyleSheet.create({})