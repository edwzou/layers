import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Find from './Find';
import MarkedList from './MarkedList';
import Profile from '../../pages/Profile/Profile';

import { Stack } from '../../utils/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

import { headerRight } from '../../components/Modal/HeaderRight';
import { usersData } from '../../constants/testData';

import { UserOutfit } from '../../pages/OutfitEdit';

const FindPage = () => {

    const FindComponent = () => (<Find usersData={usersData} />)
    const MarkedListComponent = () => (<MarkedList usersData={usersData} />)
    const ProfileComponent = () => (<Profile isForeignProfile={true} />)

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
                        name={StackNavigation.Find}
                        component={FindComponent}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name={StackNavigation.MarkedList}
                        component={MarkedListComponent}
                        options={{
                            presentation: 'modal',
                            headerTitle: `${usersData.length} Marked`
                        }}
                    />
                    <Stack.Screen
                        name={StackNavigation.Profile}
                        component={ProfileComponent}
                        options={{
                            headerShown: false,
                            presentation: 'modal'
                        }}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default FindPage

const styles = StyleSheet.create({})