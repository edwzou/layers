import React, { useState } from 'react';
import CameraComponent from './Camera';
import ItemCreate from '../../pages/ItemView/ItemCreate';
import { Stack, StackTypes } from '../../utils/StackNavigation';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import GlobalStyles from '../../constants/GlobalStyles';
import { StackNavigation } from '../../constants/Enums';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const dummyId = 'createID: ';
let createCount = 0;

const CameraWrapper = ({ route }: any) => {

	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const { fromSettings } = route.params;

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

	const updateClothingItem = (image: string) => {
		createCount += 1;
		const newId = dummyId + createCount;
		setClothingItem({
			...clothingItem,
			image_url: image,
			ciid: newId,
		});
	};

	const updatePhoto = (photo: string) => {
		updateClothingItem(photo);
	};

	const redirectToProfile = () => {
		navigation.navigate(StackNavigation.Profile, {});
	};

	const ItemCreateComponent = () => (
		<ItemCreate clothingItem={clothingItem} navigateToProfile={redirectToProfile} />
	);

	const CameraComponents = () => (
		<CameraComponent data={updatePhoto} returnToNavigation={navigation} fromSettings={fromSettings ? fromSettings : false} />
	);

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
