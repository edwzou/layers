import React from 'react';
import { View, StyleSheet, Pressable, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackTypes } from '../../utils/StackNavigation';
import { StackNavigation } from '../../constants/Enums';

import Icon from 'react-native-remix-icon';
import GlobalStyles from '../../constants/GlobalStyles';

export default function Navbar() {
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
                <Pressable onPress={() => {
                    console.log('Feedback icon tapped');
                }}>
                    <Icon
                        name={GlobalStyles.icons.feedbackOutline}
                        color={GlobalStyles.colorPalette.primary[900]}
                        size={GlobalStyles.sizing.icon}
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
                        size={GlobalStyles.sizing.icon}
                    />
                </Pressable>
                <Pressable onPress={() => {
                    console.log('Search icon tapped');
                }}>
                    <Icon
                        name={GlobalStyles.icons.searchOutline}
                        color={GlobalStyles.colorPalette.primary[900]}
                        size={GlobalStyles.sizing.icon}
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
