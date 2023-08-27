import { View, StyleSheet } from 'react-native';
import React from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import Settings from './Settings';

const SettingsPage = () => {
    return (
        <View style={{ gap: 40 }}>
            <View style={styles.container}>
                <Settings />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: GlobalStyles.layout.xGap,
        paddingTop: GlobalStyles.layout.modalTopPadding,
    },
});

export default SettingsPage;
