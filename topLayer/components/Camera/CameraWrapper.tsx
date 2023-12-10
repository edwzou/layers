import React, { createContext, useState } from 'react';
import CameraComponent from './Camera';
import EditClothing from '../../pages/ItemView/EditClothing';
import { Stack } from '../../utils/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import GlobalStyles from '../../constants/GlobalStyles';
import { StackNavigation, StepOverTypes } from '../../constants/Enums';

import { headerButton } from '../Modal/HeaderButton';
import bottoms1 from '../../assets/bottoms1.png';
import { ColorTags } from '../../constants/Enums';

const dummyId = 'createID: ';
let createCount = 0;

type PhotoType = {
	base64: string;
	updatePhoto: (photo: any) => void;
};

const CameraWrapper = ({ route }: any) => {
	const [data, setData] = useState<string>('');
	const [clothingItem, setClothingItem] = useState({
		ciid: '',
		image_url: '',
		category: '',
		title: '',
		uid: '',
		brands: [],
		size: '',
		color: [],
		created_at: ''
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
		setData(photo);
		updateClothingItem(photo);
	};

	const EditClothingComponent = () => (
		<EditClothing clothingItem={clothingItem} />
	);

	const CameraComponentS = () => <CameraComponent data={updatePhoto} />;

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
					{!data ? (
						<Stack.Screen
							name={StackNavigation.Camera}
							component={CameraComponentS}
							options={{
								headerShown: false,
							}}
						/>
					) : (
						<Stack.Screen
							name={StackNavigation.EditClothing}
							component={EditClothingComponent}
							options={{
								headerTitle: 'Edit',
								headerRight: () =>
									headerButton({
										type: StepOverTypes.done,
										handlePress: () => {
											console.log('Done tapped');
										},
									}),
							}}
						/>
					)}
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default CameraWrapper;
