import React from 'react';
import { View, StyleSheet, Pressable, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackTypes } from '../../utils/StackNavigation';
import { StackNavigation } from '../../constants/Enums';

import Icon from 'react-native-remix-icon';
import GlobalStyles from '../../constants/GlobalStyles';

type NavbarPropsType = {
    toggleFeedbackModal: () => void;
};

const Navbar = ({ toggleFeedbackModal }: NavbarPropsType) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.icons}>
                <Pressable onPress={() => {
                    navigation.navigate(StackNavigation.Match);
                }}>
                    <Icon
                        name={GlobalStyles.icons.shirtOutline}
                        color={GlobalStyles.colorPalette.primary[900]}
                        size={30}
                    />
                </Pressable>
                <Pressable onPress={() => toggleFeedbackModal()}>
                    <Icon
                        name={GlobalStyles.icons.feedbackOutline}
                        color={GlobalStyles.colorPalette.primary[900]}
                        size={GlobalStyles.sizing.icon.regular}
                    />
                </Pressable>
            </View>
            <View style={styles.icons}>
                <Pressable onPress={() => {
                    console.log('Add icon tapped');
                }}>
                    <Icon
                        name={GlobalStyles.icons.addOutline}
                        color={GlobalStyles.colorPalette.primary[900]}
                        size={GlobalStyles.sizing.icon.regular}
                    />
                </Pressable>
                <Pressable onPress={() => {
                    navigation.navigate(StackNavigation.Find);
                }}>
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
        marginHorizontal: GlobalStyles.layout.xGap
    },
    icons: {
        flexDirection: 'row',
        gap: 28,
    }
});

export default Navbar;