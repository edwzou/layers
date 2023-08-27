import { StyleSheet } from 'react-native'
import React, { useState } from 'react'

import Find from './Find';
import MarkedList from './MarkedList';
import ForeignProfile from '../../pages/Profile/ForeignProfile';
import ItemViewPage from '../../pages/ItemView/ItemViewPage';
import OutfitViewPage from '../../pages/OutfitView/OutfitViewPage';

import { Stack } from '../../utils/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigation } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

import { usersData } from '../../constants/testData';

import { UserClothing } from '../../pages/Match';
import { UserOutfit } from '../../pages/OutfitEdit';

const FindPage = () => {

    const [selectedItem, setSelectedItem] = useState<UserClothing>({} as UserClothing)
    const [selectedOutfit, setSelectedOutfit] = useState<UserOutfit>({} as UserOutfit)

    const FindComponent = () => (<Find usersData={usersData} />)
    const MarkedListComponent = () => (<MarkedList usersData={usersData} />)
    const ForeignProfileComponent = () => (<ForeignProfile setSelectedItem={setSelectedItem} setSelectedOutfit={setSelectedOutfit} isPrivate={false} />)
    const ItemViewPageComponent = () => (<ItemViewPage selectedItem={selectedItem} />)
    const OutfitViewPageComponent = () => (<OutfitViewPage selectedOutfit={selectedOutfit} />)

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
                    <Stack.Group
                        screenOptions={{
                            presentation: 'modal'
                        }}>
                        <Stack.Screen
                            name={StackNavigation.MarkedList}
                            component={MarkedListComponent}
                            options={{
                                headerTitle: `${usersData.length} Marked`
                            }}
                        />
                        <Stack.Screen
                            name={StackNavigation.ForeignProfile}
                            component={ForeignProfileComponent}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name={StackNavigation.ItemView}
                            component={ItemViewPageComponent}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name={StackNavigation.OutfitView}
                            component={OutfitViewPageComponent}
                            options={{
                                headerShown: false,
                            }}
                        />
                    </Stack.Group>
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default FindPage

const styles = StyleSheet.create({})