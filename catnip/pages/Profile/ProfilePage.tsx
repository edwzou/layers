import { View, StyleSheet } from 'react-native';
import React from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import Profile from './Profile';

const ProfilePage = () => {
    return (
        <View style={styles.container}>
            <Profile />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: GlobalStyles.layout.xGap,
        marginTop: GlobalStyles.layout.topHeaderGap,
    },
});

export default ProfilePage;
