import { StyleSheet } from 'react-native';
import React, { useRef, useContext, useState } from 'react';

import OutfitView from './OutfitView';
import OutfitEdit from './OutfitEdit';

import { Stack } from '../../utils/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

import { headerButton } from '../../components/Modal/HeaderButton';
import { UserClothing, UserClothingList } from '../../pages/Match';

import { baseUrl } from '../../utils/apiUtils';
import axios from 'axios';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from 'utils/StackNavigation';
import { MainPageContext } from '../../pages/Main/MainPage';

import Toast from 'react-native-toast-message';
import { toast } from '../../constants/GlobalStrings'

const OutfitViewPage = ({ route }: any) => {
	const { setShouldRefreshMainPage } = useContext(MainPageContext);

	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const { item, editable } = route.params;

	const outfitTitleRef = useRef(item.title);

	const [isLoading, setIsLoading] = useState(false); // Add loading state

	const getFlatArrayOfValues = (
		clothingList: UserClothingList
	): UserClothing[] => {
		return Object.values(clothingList).flat();
	};

	const redirectToProfile = () => {
		navigation.navigate(StackNavigation.Profile, {});
	};

	const OutfitViewComponent = () => (
		<OutfitView clothingItems={getFlatArrayOfValues(item.clothing_items)} />
	);
	const OutfitEditComponent = () => (
		<OutfitEdit
			id={item.oid}
			title={item.title}
			clothingItems={getFlatArrayOfValues(item.clothing_items)}
			titleRef={outfitTitleRef}
			navigateToProfile={redirectToProfile}
			updateIsLoading={isLoading}
		/>
	);

	// Only updates title
	const updateOutfit = async () => {
		const updatedTitle = outfitTitleRef.current;

		setIsLoading(true); // Start loading
		try {
			const response = await axios.put(
				`${baseUrl}/api/private/outfits/${item.oid}`,
				{
					title: updatedTitle,
				}
			);

			if (response.status === 200) {
				//alert(`You have updated: ${JSON.stringify(response.data)}`);
				setShouldRefreshMainPage(true);
				redirectToProfile();
				showSuccessUpdateToast()
			} else {
				showErrorUpdateToast()
				// throw new Error('An error has occurred while updating outfit');
			}
			setIsLoading(false); // Stop loading on success
		} catch (error) {
			setIsLoading(false); // Stop loading on error
			void axiosEndpointErrorHandler(error);
		}
	};

	const showSuccessUpdateToast = () => {
		Toast.show({
			type: 'success',
			text1: toast.success,
			text2: toast.yourOutfitHasBeenUpdated,
			topOffset: GlobalStyles.layout.toastTopOffset,
		});
	}

	const showErrorUpdateToast = () => {
		Toast.show({
			type: 'error',
			text1: toast.error,
			text2: toast.anErrorHasOccurredWhileUpdatingOutfit,
			topOffset: GlobalStyles.layout.toastTopOffset
		});
	}

	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator>
				<Stack.Group
					screenOptions={{
						headerTitleStyle: GlobalStyles.typography.subtitle,
						headerStyle: {
							backgroundColor: GlobalStyles.colorPalette.background,
						},
						headerShadowVisible: false,
					}}
				>
					<Stack.Screen
						name={StackNavigation.ItemView}
						component={OutfitViewComponent}
						options={({ navigation }) => ({
							headerTitle: item.title,
							headerRight: editable
								? () =>
									headerButton({
										type: StepOverTypes.edit,
										handlePress: () => {
											navigation.navigate(StackNavigation.EditClothing);
										},
									})
								: undefined,
						})}
					/>
					<Stack.Screen
						name={StackNavigation.EditClothing}
						component={OutfitEditComponent}
						options={{
							headerTitle: 'Edit',
							headerRight: () =>
								headerButton({
									type: StepOverTypes.done,
									handlePress: updateOutfit,
								}),
						}}
					/>
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default OutfitViewPage;

const styles = StyleSheet.create({});

