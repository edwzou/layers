import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import Icon from 'react-native-remix-icon';

import GlobalStyles from '../../constants/GlobalStyles';

import * as RootNavigation from '../../RootNavigation';

import { NavigationContext } from '../../pages/Main/MainPage';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { StackNavigation } from '../../constants/Enums';

interface NavbarPropsType {
    toggleFeedbackModal: () => void;
}

const Navbar = ({ toggleFeedbackModal }: NavbarPropsType) => {
    const navigationContext = useContext(NavigationContext);
    const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.icons}>
                <Pressable
                    onPress={() => {
                        navigationContext[1]();
                    }}
                >
                    <Icon
                        name={GlobalStyles.icons.shirtOutline}
                        color={GlobalStyles.colorPalette.primary[900]}
                        size={GlobalStyles.sizing.icon.regular}
                    />
                </Pressable>
                <Pressable
                    onPress={() => {
                        toggleFeedbackModal();
                    }}
                >
                    <Icon
                        name={GlobalStyles.icons.feedbackOutline}
                        color={GlobalStyles.colorPalette.primary[900]}
                        size={GlobalStyles.sizing.icon.regular}
                    />
                </Pressable>
            </View>
            <View style={styles.icons}>
                <Pressable
                    onPress={() => {
                        RootNavigation.navigate(StackNavigation.Camera, {
                            id: undefined,
                            initialRouteName: undefined,
                            children: null,
                            screenListeners: null,
                            screenOptions: null
                        })
                    }}
                >
                    <Icon
                        name={GlobalStyles.icons.addCircleOutline}
                        color={GlobalStyles.colorPalette.primary[900]}
                        size={GlobalStyles.sizing.icon.regular}
                    />
                </Pressable>
                <Pressable
                    onPress={() => {
                        navigationContext[2]();
                    }}
                >
                    <Icon
                        name={GlobalStyles.icons.searchOutline}
                        color={GlobalStyles.colorPalette.primary[900]}
                        size={GlobalStyles.sizing.icon.regular}
                    />
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: GlobalStyles.layout.xGap,
    },
    icons: {
        flexDirection: 'row',
        gap: 28,
    },
});

export default Navbar;
