import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import lincolnPfp from '../../assets/lincoln.jpg';

type MarkedPropsType = {
    number: number,
    topPfp?: any,
    middlePfp?: any,
    bottomPfp?: any,
};

const Marked = ({ number, topPfp, middlePfp, bottomPfp }: MarkedPropsType) => {

    return (
        <View style={styles.container}>
            <View style={styles.textArea}>
                <Text style={GlobalStyles.typography.body}>{number} Marked</Text>
                <Text style={styles.label}>View your marked profiles</Text>
            </View>

            <View style={styles.profilePicturesContainer}>
                <Image source={topPfp} style={styles.profilePicture} />
                <Image source={middlePfp} style={styles.profilePicture} />
                <Image source={bottomPfp} style={styles.profilePicture} />
            </View>
        </ View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        padding: 20,
        backgroundColor: GlobalStyles.colorPalette.primary[200],
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textArea: {
        flex: 1,
        flexDirection: 'column',
        gap: 5,
    },
    title: {
        ...GlobalStyles.typography.body,
        color: GlobalStyles.colorPalette.primary[900],
    },
    label: {
        ...GlobalStyles.typography.body2,
        color: GlobalStyles.colorPalette.primary[400],
    },
    profilePicturesContainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 20,
    },
    profilePicture: {
        width: GlobalStyles.sizing.pfp.small,
        height: GlobalStyles.sizing.pfp.small,
        borderRadius: GlobalStyles.sizing.pfp.small / 2,
        marginLeft: -4,
    },
});

export default Marked;

