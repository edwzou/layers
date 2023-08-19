import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ColorTag from '../../components/Tag/ColorTag';
import { TagAction, ColorTags } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

interface ColorPickerPropsType {
    onNewColorPress: (colorToAdd: [string, string]) => void;
}

const ColorPicker = ({ onNewColorPress }: ColorPickerPropsType) => {
    const colors = [
        ColorTags.Blue, ColorTags.Teal, ColorTags.Mint, ColorTags.Green, ColorTags.Olive, ColorTags.Yellow, ColorTags.Beige, ColorTags.Brown,
        ColorTags.Orange, ColorTags.Red, ColorTags.Maroon, ColorTags.Pink, ColorTags.Purple, ColorTags.Navy, ColorTags.Black, ColorTags.Grey, ColorTags.White
    ];

    const tagWidth = 80; // Adjust this value according to your desired tag size

    const [tagsPerRow, setTagsPerRow] = useState(4); // Initial number of tags per row
    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        // Calculate the optimal number of tags per row based on aspect ratio
        const optimalTagsPerRow = Math.floor(screenWidth / tagWidth);
        setTagsPerRow(optimalTagsPerRow);
    }, [screenWidth]);

    const renderColorTags = () => {
        const rows = Math.ceil(colors.length / tagsPerRow);

        const colorTagRows = [];
        for (let i = 0; i < rows; i++) {
            const rowColors = colors.slice(i * tagsPerRow, (i + 1) * tagsPerRow);
            colorTagRows.push(
                <View key={i} style={styles.row}>
                    {rowColors.map((color, index) => (
                        <ColorTag key={index} action={TagAction.push} color={color} onPress={() => onNewColorPress(color)} />
                    ))}
                </View>
            );
        }

        return colorTagRows;
    };

    return (
        <View style={styles.container}>
            {renderColorTags()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.utils.mediumRadius,
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginVertical: 5,
    },
});

export default ColorPicker;
