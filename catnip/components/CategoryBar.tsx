import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';

export default function CategoryBar() {
    const [selectedTitle, setSelectedTitle] = useState('Outfits');

    const handleTitlePress = (title: string) => {
        if (selectedTitle !== title) {
            setSelectedTitle(title);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleTitlePress('Outfits')}>
                <View style={[styles.titleContainer, selectedTitle === 'Outfits' && styles.currentTitle]}>
                    <Text style={[styles.title, selectedTitle === 'Outfits' && styles.currentTitleText]}>Outfits</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTitlePress('Tops')}>
                <View style={[styles.titleContainer, selectedTitle === 'Tops' && styles.currentTitle]}>
                    <Text style={[styles.title, selectedTitle === 'Tops' && styles.currentTitleText]}>Tops</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTitlePress('Bottoms')}>
                <View style={[styles.titleContainer, selectedTitle === 'Bottoms' && styles.currentTitle]}>
                    <Text style={[styles.title, selectedTitle === 'Bottoms' && styles.currentTitleText]}>Bottoms</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTitlePress('Footwear')}>
                <View style={[styles.titleContainer, selectedTitle === 'Footwear' && styles.currentTitle]}>
                    <Text style={[styles.title, selectedTitle === 'Footwear' && styles.currentTitleText]}>Footwear</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalStyles.colorPalette.background,
    },
    titleContainer: {
        paddingHorizontal: 15,
    },
    title: {
        ...GlobalStyles.typography.body,
        color: GlobalStyles.colorPalette.primary[300],
    },
    currentTitle: {
        backgroundColor: 'black',
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    currentTitleText: {
        color: 'white',
    },
});
