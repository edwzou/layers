import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import React from 'react';
import Icon from 'react-native-remix-icon';
import GlobalStyles from '../../constants/GlobalStyles';

export default function Navbar() {
    return (
        <View style={styles.container}>
            <View style={styles.leftIcons}>
                <Pressable onPress={() => {
                    console.log('Shirt icon tapped');
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
                        size={30}
                    />
                </Pressable>
            </View>
            <View style={styles.rightIcons}>
                <Pressable onPress={() => {
                    console.log('Search icon tapped');
                }}>
                    <Icon
                        name={GlobalStyles.icons.searchOutline}
                        color={GlobalStyles.colorPalette.primary[900]}
                        size={30}
                    />
                </Pressable>
                <Pressable onPress={() => {
                    console.log('Add icon tapped');
                }}>
                    <Icon
                        name={GlobalStyles.icons.addOutline}
                        color={GlobalStyles.colorPalette.primary[900]}
                        size={30}
                    />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Dimensions.get('window').width - ((30 * 4) + (28 * 2) + 42),
    },
    leftIcons: {
        flexDirection: 'row',
        gap: 28,
        justifyContent: 'flex-start',
    },
    rightIcons: {
        flexDirection: 'row-reverse',
        gap: 28,
        justifyContent: 'flex-end',
    },
});
