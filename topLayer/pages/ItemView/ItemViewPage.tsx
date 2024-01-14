import ItemView from './ItemView';
import { Stack } from '../../utils/StackNavigation';
import { type RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigation } from '../../constants/Enums';
import React, { type ReactElement } from 'react';
import { type RouteTypes } from '../../types/Routes';

const ItemViewPage = (): ReactElement => {
	const route = useRoute<RouteProp<RouteTypes, 'ItemViewPage'>>();
	const { item } = route.params;

	const ItemViewComponent: React.FC = () => <ItemView clothingItem={item} />;

	return (
		<Stack.Navigator>
			<Stack.Screen
				name={StackNavigation.ItemView}
				component={ItemViewComponent}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};

export default ItemViewPage;
