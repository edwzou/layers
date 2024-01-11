import ItemView from './ItemView';
import ItemEdit from './ItemEdit';
import { Stack, type StackTypes } from '../../utils/StackNavigation';
import {
	NavigationContainer,
	type RouteProp,
	useNavigation,
	useRoute,
} from '@react-navigation/native';
import { StackNavigation } from '../../constants/Enums';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { type ReactElement } from 'react';
import { type RouteTypes } from 'types/Routes';

const ItemViewPage = (): ReactElement => {
	const route = useRoute<RouteProp<RouteTypes, 'ItemViewPage'>>();
	const { item, editable } = route.params;

	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const redirectToProfile = (): void => {
		navigation.navigate(StackNavigation.Profile, {});
	};

	const ItemViewComponent: React.FC = () => (
		<ItemView clothingItem={item} editable={editable} />
	);
	const ItemEditComponent: React.FC = () => (
		<ItemEdit clothingItem={item} navigateToProfile={redirectToProfile} />
	);

	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator>
				<Stack.Group>
					<Stack.Screen
						name={StackNavigation.ItemView}
						component={ItemViewComponent}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={StackNavigation.ItemEdit}
						component={ItemEditComponent}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default ItemViewPage;
