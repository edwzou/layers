import { StyleSheet } from 'react-native';

import ItemView from './ItemView'
import ItemEdit from './ItemEdit';

import { Stack, StackTypes } from '../../utils/StackNavigation';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

import { headerButton } from '../../components/Modal/HeaderButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';

const ItemViewPage = ({ route }: any) => {
    const { item, editable } = route.params;

    const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

    const redirectToProfile = () => {
        navigation.navigate(StackNavigation.Profile, {});
    };

    const ItemViewComponent = () => (<ItemView clothingItem={item} />)
    const ItemEditComponent = () => (
        <ItemEdit
            clothingItem={item}
            navigateToProfile={redirectToProfile}
        />
    )

    return (
        <NavigationContainer
            independent={true}>
            <Stack.Navigator>
                <Stack.Group
                    screenOptions={{
                        headerTitleStyle: GlobalStyles.typography.subtitle,
                        headerStyle: {
                            backgroundColor: GlobalStyles.colorPalette.background,
                        },
                        headerShadowVisible: false,
                    }}>
                    <Stack.Screen
                        name={StackNavigation.ItemView}
                        component={ItemViewComponent}
                        options={({ navigation }) => ({
                            headerTitle: item.title,
                            headerRight: editable ? (() => headerButton({
                                type: StepOverTypes.edit,
                                handlePress: () => {
                                    navigation.navigate(StackNavigation.ItemEdit);
                                },
                            })) : undefined,
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
    )
}

export default ItemViewPage;