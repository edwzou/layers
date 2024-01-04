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
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';
import { MainPageContext } from '../../pages/Main/MainPage';
import { toast } from '../../constants/GlobalStrings';
import {
	showErrorToast,
	showSuccessToast,
} from '../../components/Toasts/Toasts';
import { emptyClothing } from '../../constants/Clothing';

export const MatchPageContext = createContext({
	setMatch: (unused: any) => {},
	dismissal: false,
	isLoading: false,
});

const MatchPage: React.FC = () => {
	const { setShouldRefreshMainPage } = useContext(MainPageContext);
	const [dismissal, setDismissal] = useState(false);
	const [isLoading, setIsLoading] = useState(false); // Add loading state

	const [match, setMatch] = useState({
		previewData: {
			outerwear: { ...emptyClothing },
			tops: { ...emptyClothing },
			bottoms: { ...emptyClothing },
			shoes: { ...emptyClothing },
		},
		matchName: '',
	});

	const onSubmit = (): void => {
		const clothingItems = [
			match.previewData.outerwear !== null &&
			match.previewData.outerwear !== undefined
				? match.previewData.outerwear.ciid
				: null,
			match.previewData.tops !== null && match.previewData.tops !== undefined
				? match.previewData.tops.ciid
				: null,
			match.previewData.bottoms !== null &&
			match.previewData.bottoms !== undefined
				? match.previewData.bottoms.ciid
				: null,
			match.previewData.shoes !== null && match.previewData.shoes !== undefined
				? match.previewData.shoes.ciid
				: null,
		].filter((item) => item !== null);
		console.log('item: ', clothingItems);

		const onSubmitInner = async (): Promise<void> => {
			setIsLoading(true); // Start loading
			try {
				const response = await axios.post(`${baseUrl}/api/private/outfits`, {
					title: match.matchName,
					clothing_items: clothingItems,
				});

				if (response.status === 200) {
					// alert(`You have created: ${JSON.stringify(response.data)}`);
					setDismissal(true);
					setShouldRefreshMainPage(true);
					// navigationArray[0](); // Uncomment this to navigate to profile page
					setDismissal(false);
					showSuccessToast(toast.yourOutfitHasBeenCreated);
				} else {
					showErrorToast(toast.anErrorHasOccurredWhileCreatingOutfit);
					// throw new Error('An error has occurred while submitting outfit');
				}
				setIsLoading(false); // Stop loading on success
			} catch (error) {
				setIsLoading(false); // Stop loading on error
				axiosEndpointErrorHandler(error);
			}
		};
		void onSubmitInner();
	};

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
							headerRight: () =>
								headerButton({
									type: StepOverTypes.done,
									handlePress: () => {
										onSubmit();
									},
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
