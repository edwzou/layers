import React, { type ReactElement, useState } from 'react';
import CameraComponent from './Camera';
import ItemCreate from '../../pages/ItemView/ItemCreate';
import { Stack, type StackTypes } from '../../utils/StackNavigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../constants/Enums';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { emptyClothing } from '../../constants/Clothing';

const dummyId = 'createID: ';
let createCount = 0;

const ItemCamera = (): ReactElement => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const [clothingItem, setClothingItem] = useState({ ...emptyClothing });

	const cameraFunction = (image: string): void => {
		navigation.navigate(StackNavigation.ItemCreate, {});
		createCount += 1;
		const newId = dummyId + createCount.toString();
		setClothingItem({
			...clothingItem,
			image_url: image,
			ciid: newId,
		});
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
		<CameraComponent cameraFunction={cameraFunction} />
	);

	return (
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
	);
};

export default ItemCamera;
