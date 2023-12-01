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
import { UserClothing } from '.';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';

export const MatchPageContext = createContext({ setMatch: (_?: any) => { } });

const MatchPage = () => {

	const [match, setMatch] = useState({
		previewData: {
			outerwear: {} as UserClothing,
			tops: {} as UserClothing,
			bottoms: {} as UserClothing,
			shoes: {} as UserClothing
		},
		matchName: ''
	})

	const handleSubmitOutfit = async () => {
		const clothingItems = [
			match.previewData.outerwear.ciid,
			match.previewData.tops.ciid,
			match.previewData.bottoms.ciid,
			match.previewData.shoes.ciid,
		].filter(item => Object.keys(item).length > 0);

		try {
			const response = await axios.post(`${baseUrl}/api/private/outfits`, {
				title: match.matchName,
				clothing_items: clothingItems
			});

			if (response.status === 201) {
				alert(`You have created: ${JSON.stringify(response.data)}`);
			} else {
				throw new Error('An error has occurred');
			}
		} catch (error) {
			void axiosEndpointErrorHandler(error)
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