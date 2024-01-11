import { StyleSheet } from 'react-native';
import React, { type ReactElement, useRef } from 'react';
import OutfitView from './OutfitView';
import OutfitEdit from './OutfitEdit';
import { Stack } from '../../utils/StackNavigation';
import {
	NavigationContainer,
	useNavigation,
	useRoute,
	type RouteProp,
} from '@react-navigation/native';
import { StackNavigation } from '../../constants/Enums';
import { type UserClothing } from '../../types/Clothing';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { type UserOutfit } from '../../types/Outfit';
import { type RouteTypes } from 'types/Routes';

const OutfitViewPage = (): ReactElement => {
	const route = useRoute<RouteProp<RouteTypes, 'OutfitViewPage'>>();

	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const { item, editable }: { item: UserOutfit; editable: boolean } =
		route.params;
	const { oid, clothing_items, title } = item;

	const outfitTitleRef = useRef(item.title);

	const getFlatArrayOfValues = (
		clothingList: UserClothing[]
	): UserClothing[] => {
		return Object.values(clothingList).flat();
	};

	const redirectToProfile = (): void => {
		navigation.navigate(StackNavigation.Profile, {});
	};

	const OutfitViewComponent = (): ReactElement => (
		<OutfitView
			title={title}
			clothingItems={getFlatArrayOfValues(clothing_items)}
			editable={editable}
		/>
	);
	const OutfitEditComponent = (): ReactElement => (
		<OutfitEdit
			id={oid}
			title={title}
			clothingItems={getFlatArrayOfValues(clothing_items)}
			titleRef={outfitTitleRef}
			navigateToProfile={redirectToProfile}
		/>
	);

	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator>
				<Stack.Group>
					<Stack.Screen
						name={StackNavigation.OutfitView} // FIX THIS
						component={OutfitViewComponent}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={StackNavigation.OutfitEdit} // FIX THIS
						component={OutfitEditComponent}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default OutfitViewPage;

const styles = StyleSheet.create({});
