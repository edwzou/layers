import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

type ItemCardPropsType = {
    size: number;
    image: string;
};

export default function ItemCard({ size, image }: ItemCardPropsType) {
    return (
        <View style={[styles.itemCard, { width: size, height: size }]}>
            <Image source={{ uri: image }} style={styles.image} resizeMode="center" />
        </View>
    );
}

const styles = StyleSheet.create({
    itemCard: {
        borderRadius: 20,
        backgroundColor: '#EBEBEC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
