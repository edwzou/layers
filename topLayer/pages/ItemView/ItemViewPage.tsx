import { StyleSheet } from 'react-native'

import ItemView from './ItemView'
import ItemEdit from './ItemEdit';

import { Stack } from '../../utils/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

import { headerButton } from '../../components/Modal/HeaderButton';

const ItemViewPage = ({ route }: any) => {

    const { item, editable } = route.params;

    const ItemViewComponent = () => (<ItemView clothingItem={item} />)
    const ItemEditComponent = () => (<ItemEdit clothingItem={item} />)

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
                                    navigation.navigate(StackNavigation.EditClothing);
                                },
                            })) : undefined,
                        })}
                    />
                    <Stack.Screen
                        name={StackNavigation.EditClothing}
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

export default ItemViewPage

const styles = StyleSheet.create({})