import ItemView from './ItemView';
import ItemEdit from './ItemEdit';
import { Stack, type StackTypes } from '../../utils/StackNavigation';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';
import { headerButton } from '../../components/Modal/HeaderButton';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { type ReactElement } from 'react';

const ItemViewPage = ({ route }: any): ReactElement => {
	const { item, editable } = route.params;

	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const redirectToProfile = (): void => {
		navigation.navigate(StackNavigation.Profile, {});
	};

	const ItemViewComponent: React.FC = () => <ItemView clothingItem={item} />;
	const ItemEditComponent: React.FC = () => (
		<ItemEdit clothingItem={item} navigateToProfile={redirectToProfile} />
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
						name={StackNavigation.ItemView}
						component={ItemViewComponent}
						options={({ navigation }) => ({
							headerTitle: item.title,
							headerRight:
								editable === true
									? () =>
											headerButton({
												type: StepOverTypes.edit,
												handlePress: () => {
													navigation.navigate(StackNavigation.ItemEdit);
												},
											})
									: undefined,
						})}
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
