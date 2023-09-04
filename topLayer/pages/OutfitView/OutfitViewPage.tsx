import { StyleSheet } from 'react-native'
import React from 'react'

import OutfitView from './OutfitView'
import OutfitEdit from '../OutfitEdit/OutfitEdit';

import { Stack } from '../../utils/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

import { headerRight } from '../../components/Modal/HeaderRight';

const OutfitViewPage = ({ route }: any) => {

    const { item } = route.params;

    const OutfitViewComponent = () => (<OutfitView outfit={item} />)
    const OutfitEditComponent = () => (<OutfitEdit outfit={item} />)

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
                            headerTitle: item.title,
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