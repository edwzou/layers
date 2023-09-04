import { StyleSheet } from 'react-native'

import ItemView from './ItemView'
import EditClothing from './EditClothing';

import { Stack } from '../../utils/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

import { headerRight } from '../../components/Modal/HeaderRight';

const ItemViewPage = ({ route }: any) => {

    const { item } = route.params;

    const ItemViewComponent = () => (<ItemView clothingItem={item} />)
    const EditClothingComponent = () => (<EditClothing clothingItem={item} />)

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
                        component={EditClothingComponent}
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

export default ItemViewPage

const styles = StyleSheet.create({})