import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import OutfitView from './OutfitView'
import OutfitEdit from '../OutfitEdit/OutfitEdit';

import { Stack } from '../../utils/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

import { headerRight } from '../../components/Modal/HeaderRight';

import { UserOutfit } from '../../pages/OutfitEdit';

interface OutfitViewPagePropsType {
    selectedOutfit: UserOutfit;
}

const OutfitViewPage = ({ selectedOutfit }: OutfitViewPagePropsType) => {

    const OutfitViewComponent = () => (<OutfitView outfit={selectedOutfit} />)
    const OutfitEditComponent = () => (<OutfitEdit outfit={selectedOutfit} />)

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
                        component={OutfitViewComponent}
                        options={({ navigation }) => ({
                            headerTitle: selectedOutfit.title,
                            headerRight: () => headerRight({
                                type: StepOverTypes.edit,
                                handlePress: () => {
                                    navigation.navigate(StackNavigation.EditClothing);
                                },
                            }),
                        })}
                    />
                    <Stack.Screen
                        name={StackNavigation.EditClothing}
                        component={OutfitEditComponent}
                        options={{
                            headerTitle: "Edit",
                            headerRight: () => headerRight({
                                type: StepOverTypes.done,
                                handlePress: () => {
                                    console.log("Done tapped")
                                },
                            }),
                        }}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default OutfitViewPage

const styles = StyleSheet.create({})