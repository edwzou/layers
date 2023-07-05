import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';

type OutfitCardPropsType = {
    title: string;
    itemCount: number,
};

export default function OutfitCard({
    title,
    itemCount
}: OutfitCardPropsType) {
    return (
        <Pressable style={styles.container}
            onPress={() => {
                console.log('OutfitCard tapped');
            }}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.labelContainer}>
                <View style={styles.label}>
                    <Text style={styles.labelText}>{itemCount} items</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 1.8,
        borderRadius: 10,
        backgroundColor: GlobalStyles.colorPalette.card[100],
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    title: {
        ...GlobalStyles.typography.body,
        position: 'absolute',
        top: 27,
        left: 20,
    },
    labelContainer: {
        position: 'absolute',
        bottom: 15,
        left: 20,
    },
    label: {
        backgroundColor: 'black',
        borderRadius: 100,
        paddingVertical: 4,
        paddingHorizontal: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    labelText: {
        color: 'white',
        ...GlobalStyles.typography.body
    },
});