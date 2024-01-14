import { StyleSheet } from 'react-native';
import React, { type ReactElement } from 'react';
import OutfitView from './OutfitView';
import OutfitEdit from './OutfitEdit';
import { Stack } from '../../utils/StackNavigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../constants/Enums';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { useRoute, type RouteProp } from '@react-navigation/native';
import { type RouteTypes } from '../../types/Routes';
import { getFlatArrayOfValues } from '../../functions/Outfit/Outfit';

const OutfitFullPage = (): ReactElement => {
	const route = useRoute<RouteProp<RouteTypes, 'OutfitFullPage'>>();
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const { item } = route.params;
	const { oid, clothing_items, title } = item;
	console.log('clothing items: ', clothing_items);
	const clothingItems = getFlatArrayOfValues(clothing_items);

	const redirectToProfile = (): void => {
		navigation.navigate(StackNavigation.Profile, {});
	};

	const directToEdit = (): void => {
		navigation.navigate(StackNavigation.OutfitEdit, {});
	};

	const OutfitViewComponent = (): ReactElement => (
		<OutfitView
			title={title}
			clothingItems={clothingItems}
			directToOutfitEdit={directToEdit}
		/>
	);
	const OutfitEditComponent = (): ReactElement => (
		<OutfitEdit
			id={oid}
			title={title}
			clothingItems={clothingItems}
			navigateToProfile={redirectToProfile}
		/>
	);

	return (
		<Stack.Navigator>
			<Stack.Group>
				<Stack.Screen
					name={StackNavigation.OutfitView}
					component={OutfitViewComponent}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name={StackNavigation.OutfitEdit}
					component={OutfitEditComponent}
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Group>
		</Stack.Navigator>
	);
};

export default OutfitFullPage;

const styles = StyleSheet.create({});
