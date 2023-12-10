import React, {
	useState,
	createContext,
	useContext
}
	from 'react';
import { StyleSheet } from 'react-native';

import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import { Stack } from '../../utils/StackNavigation';

import { headerButton } from '../../components/Modal/HeaderButton';
import { NavigationContainer } from '@react-navigation/native';
import GlobalStyles from '../../constants/GlobalStyles';

import { baseUrl } from '../../utils/apiUtils';
import axios from 'axios';

import Match from './Match';
import OutfitPreview from '../../pages/OutfitPreview/OutfitPreview';
import { UserClothing } from '.';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';
import { MainPageContext } from '../../pages/Main/MainPage';

export const MatchPageContext = createContext({
	setMatch: (_?: any) => { },
	dismissal: false,
});

const MatchPage = () => {

	const { navigationArray, setShouldRefreshMatchPage } = useContext(MainPageContext);
	const [dismissal, setDismissal] = useState(false);

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
			match.previewData && match.previewData.outerwear ? match.previewData.outerwear.ciid : null,
			match.previewData && match.previewData.tops ? match.previewData.tops.ciid : null,
			match.previewData && match.previewData.bottoms ? match.previewData.bottoms.ciid : null,
			match.previewData && match.previewData.shoes ? match.previewData.shoes.ciid : null,
		].filter(item => item !== null);

		try {
			const response = await axios.post(`${baseUrl}/api/private/outfits`, {
				title: match.matchName,
				clothing_items: clothingItems
			});

			if (response.status === 200) {
				//alert(`You have created: ${JSON.stringify(response.data)}`);
				setDismissal(true)
				setShouldRefreshMatchPage(true)
				navigationArray[0]()
				setDismissal(false)
			} else {
				throw new Error('An error has occurred while submitting outfit');
			}
		} catch (error) {
			void axiosEndpointErrorHandler(error)
			alert(error);
		}
	};

	return (
		<MatchPageContext.Provider value={{ setMatch, dismissal }}>
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
							headerRight: () => headerButton({
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