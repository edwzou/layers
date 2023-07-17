import { View } from 'react-native';
import React from 'react';

import Profile from './Profile';
import Navbar from '../../components/Navbar/Navbar';

const ProfilePage = () => {
    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <Profile />
        </View>
    );
};

export default ProfilePage;
