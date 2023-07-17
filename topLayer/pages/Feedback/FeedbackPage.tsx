import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import GlobalStyles from '../../constants/GlobalStyles'
import SquareTextbox from '../../components/Textbox/SquareTextbox'

const FeedbackPage = () => {

    const handleLinkPress = () => {
        console.log("OPEN EMAIL DRAFT TO team@layers.com")
    };

    return (
        <View style={[styles.container, { gap: 15 }]}>
            <SquareTextbox
                label="Tell us what you think."
            />
            <View style={styles.label}>
                <Text style={styles.text}>
                    We're happy to help at
                </Text>
                <Pressable onPress={handleLinkPress}>
                    <Text style={styles.link}>
                        team@layers.com
                    </Text>
                </Pressable>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: GlobalStyles.layout.xGap,
        alignItems: 'center',
    },
    label: {
        flexDirection: 'row',
        gap: 4,
    },
    text: {
        ...GlobalStyles.typography.body2,
        color: GlobalStyles.colorPalette.primary[900]
    },
    link: {
        ...GlobalStyles.typography.body2,
        color: GlobalStyles.colorPalette.info[500]
    }
});

export default FeedbackPage;

