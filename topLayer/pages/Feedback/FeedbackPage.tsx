import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import GlobalStyles from '../../constants/GlobalStyles'
import SquareTextbox from '../../components/Textbox/SquareTextbox'
import { Feedback } from '../../constants/GlobalStrings'

const FeedbackPage = () => {

    const handleLinkPress = () => {
        console.log("OPEN EMAIL DRAFT TO team@layers.com")
    };

    return (
        <>
            <View style={[styles.container, { gap: 15 }]}>
                <SquareTextbox
                    label={Feedback.tellUsWhatYouThink}
                />
                <View style={styles.label}>
                    <Text style={styles.text}>
                        {Feedback.wereHappyToHelpAt}
                    </Text>
                    <Pressable onPress={handleLinkPress}>
                        <Text style={styles.link}>
                            {Feedback.teamAtLayersDotCom}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </>
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

