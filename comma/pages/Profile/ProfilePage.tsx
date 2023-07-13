import { View } from 'react-native';
import React from 'react';

import Profile from './Profile';
import Navbar from '../../components/Navbar/Navbar';

const ProfilePage = () => {
    return (
        <View>
            <Navbar />
            <Profile />
        </View>
    );
};

export default ProfilePage;
