import React, { useState, createContext, useContext } from 'react';
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

import Toast from 'react-native-toast-message';
import { toast } from '../../constants/GlobalStrings'

export const MatchPageContext = createContext({
	setMatch: (_?: any) => { },
	dismissal: false,
	isLoading: false,
});

const MatchPage = () => {
	const { navigationArray, setShouldRefreshMatchPage } =
		useContext(MainPageContext);
	const [dismissal, setDismissal] = useState(false);
	const [isLoading, setIsLoading] = useState(false); // Add loading state

	const [match, setMatch] = useState({
		previewData: {
			outerwear: {} as UserClothing,
			tops: {} as UserClothing,
			bottoms: {} as UserClothing,
			shoes: {} as UserClothing,
		},
		matchName: '',
	});

	const handleSubmitOutfit = async () => {
		const clothingItems = [
			match.previewData && match.previewData.outerwear
				? match.previewData.outerwear.ciid
				: null,
			match.previewData && match.previewData.tops
				? match.previewData.tops.ciid
				: null,
			match.previewData && match.previewData.bottoms
				? match.previewData.bottoms.ciid
				: null,
			match.previewData && match.previewData.shoes
				? match.previewData.shoes.ciid
				: null,
		].filter((item) => item !== null);

		setIsLoading(true); // Start loading

		try {
			const response = await axios.post(`${baseUrl}/api/private/outfits`, {
				title: match.matchName,
				clothing_items: clothingItems,
			});

			if (response.status === 200) {
				//alert(`You have created: ${JSON.stringify(response.data)}`);
				setDismissal(true);
				setShouldRefreshMatchPage(true);
				//navigationArray[0](); // Uncomment this to navigate to profile page
				setDismissal(false);
				showSuccessMatchToast()
			} else {
				showErrorMatchToast()
				//throw new Error('An error has occurred while submitting outfit');
			}
			setIsLoading(false); // Stop loading on success
		} catch (error) {
			setIsLoading(false); // Stop loading on error
			void axiosEndpointErrorHandler(error);
		}
	};

	const showSuccessMatchToast = () => {
		Toast.show({
			type: 'success',
			text1: toast.success,
			text2: toast.yourOutfitHasBeenCreated,
			topOffset: GlobalStyles.layout.toastTopOffset
		});
	}

	const showErrorMatchToast = () => {
		Toast.show({
			type: 'error',
			text1: toast.error,
			text2: toast.anErrorHasOccurredWhileSubmittingOutfit,
			topOffset: GlobalStyles.layout.toastTopOffset
		});
	}

	return (
		<MatchPageContext.Provider value={{ setMatch, dismissal, isLoading }}>
			<NavigationContainer independent={true}>
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
	);
};

export default MatchPage;

const styles = StyleSheet.create({});

