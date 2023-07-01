import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';

export default function ItemCell() {
    return (
        <View style={[styles.itemCard]} />
    );
}

const styles = StyleSheet.create({
    itemCard: {
        borderRadius: 20,
        width: '100%',
        aspectRatio: 1,
        backgroundColor: GlobalStyles.colorPalette.card[200],
        justifyContent: 'center',
        alignItems: 'center',
    },
});
