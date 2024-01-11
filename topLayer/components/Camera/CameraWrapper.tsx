import React, { type ReactElement, useState } from 'react';
import CameraComponent from './Camera';
import ItemCreate from '../../pages/ItemView/ItemCreate';
import { Stack, type StackTypes } from '../../utils/StackNavigation';
import {
	NavigationContainer,
	type RouteProp,
	useNavigation,
	useRoute,
} from '@react-navigation/native';
import { StackNavigation } from '../../constants/Enums';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type RouteTypes } from 'types/Routes';

const dummyId = 'createID: ';
let createCount = 0;

const CameraWrapper = (): ReactElement => {
	const route = useRoute<RouteProp<RouteTypes, 'CameraWrapper'>>();
	const returnToPfp = route.params.returnToPfp;
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const [clothingItem, setClothingItem] = useState({
		ciid: '',
		image_url: '',
		category: '',
		title: '',
		uid: '',
		brands: [],
		size: '',
		color: [],
		created_at: '',
	});

	const updateClothingItem = (image: string): void => {
		createCount += 1;
		const newId = dummyId + createCount.toString();
		setClothingItem({
			...clothingItem,
			image_url: image,
			ciid: newId,
		});
	};

	const updatePhoto = (photo: string): void => {
		updateClothingItem(photo);
	};

	const redirectToProfile = (): void => {
		navigation.navigate(StackNavigation.Profile, {});
	};

	const ItemCreateComponent: React.FC = () => (
		<ItemCreate
			clothingItem={clothingItem}
			navigateToProfile={redirectToProfile}
		/>
	);

	const CameraComponents: React.FC = () => (
		<CameraComponent
			data={updatePhoto}
			returnToNavigation={navigation}
			returnToPfp={returnToPfp}
		/>
	);

	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator>
				<Stack.Group>
					<Stack.Screen
						name={StackNavigation.CameraComponents}
						component={CameraComponents}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={StackNavigation.ItemCreate}
						component={ItemCreateComponent}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default CameraWrapper;
