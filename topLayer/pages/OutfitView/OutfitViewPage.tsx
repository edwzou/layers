import { StyleSheet } from 'react-native';
import React, { useRef } from 'react';

import OutfitView from './OutfitView';
import OutfitEdit from './OutfitEdit';

import { Stack } from '../../utils/StackNavigation';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

import { headerButton } from '../../components/Modal/HeaderButton';
import { type UserClothing, type UserClothingList } from '../../pages/Match';

import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';

const OutfitViewPage = ({ route }: any) => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const { item, editable } = route.params;

	const outfitTitleRef = useRef(item.title);

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
		/>
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
						name={StackNavigation.OutfitView} // FIX THIS
						component={OutfitViewComponent}
						options={({ navigation }) => ({
							headerTitle: item.title,
							headerRight: editable
								? () =>
										headerButton({
											type: StepOverTypes.edit,
											handlePress: () => {
												navigation.navigate(StackNavigation.OutfitEdit);
											},
										})
								: undefined,
						})}
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
