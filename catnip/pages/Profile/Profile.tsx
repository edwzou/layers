import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import FullName from '../../components/Name/FullName'
import Username from '../../components/Name/Username'
import CategoryBar from '../../components/Navbar/CategoryBar';
import OutfitCard from '../../components/Card/OutfitCard';
import Navbar from '../../components/Navbar/Navbar'

export default function Profile() {
    return (
        <View style={{ alignItems: 'center' }}>
            <Navbar />
            <View style={{ marginBottom: 30 }}>
                <View>
                    <Pressable
                        onPress={() => {
                            console.log('PFP Click');
                        }}
                    >
                        <ProfilePicture />
                    </Pressable>
                    <View style={{ marginTop: 7 }}>
                        <FullName firstName={"Charlie"} lastName={"Wu"} />
                        <Username username={"_charlie_wu"} />
                    </View>
                </View>
            </View>
            <View style={{ gap: 20, alignItems: 'center' }}>
                <CategoryBar />
                <OutfitCard title="Friday night" itemCount={3} />
                <OutfitCard title="Weekend casual" itemCount={5} />
            </View>
        </View>
    );
}
