import React, { type ReactElement } from 'react';
import { Stack } from '../../utils/StackNavigation';
import { StackNavigation } from '../../constants/Enums';
import OutfitView from './OutfitView';
import { useRoute, type RouteProp } from '@react-navigation/native';
import { type RouteTypes } from '../../types/Routes';
import { getFlatArrayOfValues } from '../../functions/Outfit/Outfit';

const OutfitViewPage = (): ReactElement => {
	const route = useRoute<RouteProp<RouteTypes, 'OutfitViewPage'>>();
	const { item } = route.params;
	const { clothing_items, title } = item;
	const clothingItems = getFlatArrayOfValues(clothing_items);

	const OutfitViewComponent = (): ReactElement => (
		<OutfitView title={title} clothingItems={clothingItems} />
	);

	return (
		<Stack.Navigator>
			<Stack.Screen
				name={StackNavigation.OutfitView}
				component={OutfitViewComponent}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};

export default OutfitViewPage;
