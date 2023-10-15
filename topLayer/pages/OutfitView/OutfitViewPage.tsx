import { StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

import OutfitView from './OutfitView'
import OutfitEdit from './OutfitEdit';

import { Stack } from '../../utils/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

import { headerRight } from '../../components/Modal/HeaderRight';
import { UserClothing } from '../../pages/Match';

import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';

const OutfitViewPage = ({ route }: any) => {

    const { item, editable } = route.params;

    const [clothingItems, setClothingItems] = useState<UserClothing[]>([]);

    useEffect(() => {
        const getClothingItems = async () => {
            let fetchedClothingItems: UserClothing[] = [];
            for (let i = 0; i < item.clothing_items.length; i++) {
                const { data, status } = await axios.get(`${baseUrl}/api/private/clothing_items/${item.clothing_items[i]}`);

                if (status === 200) {
                    fetchedClothingItems.push(data.data);
                }
            }
            setClothingItems(fetchedClothingItems);
        };

        void getClothingItems();
    }, []);

    const OutfitViewComponent = () => (<OutfitView clothingItems={clothingItems} />)
    const OutfitEditComponent = () => (<OutfitEdit title={item.title} clothingItems={clothingItems} />)

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
                            headerRight: editable ? (() => headerRight({
                                type: StepOverTypes.edit,
                                handlePress: () => {
                                    navigation.navigate(StackNavigation.EditClothing);
                                },
                            })) : undefined,
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