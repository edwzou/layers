import { StyleSheet } from 'react-native';
import React, { type ReactElement, useRef } from 'react';
import OutfitView from './OutfitView';
import OutfitEdit from './OutfitEdit';
import { Stack } from '../../utils/StackNavigation';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';
import { headerButton } from '../../components/Modal/HeaderButton';
import { type UserClothing } from '../../types/Clothing';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { type UserOutfit } from '../../types/Outfit';

const OutfitViewPage = ({ route }: any): ReactElement => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const { item, editable }: { item: UserOutfit; editable?: boolean } =
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
		<OutfitView clothingItems={getFlatArrayOfValues(clothing_items)} />
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
							headerRight:
								editable === true
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
