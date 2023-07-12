import React, { useState } from 'react';
import { View, Dimensions, Pressable } from 'react-native';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import FullName from '../../components/Name/FullName'
import Username from '../../components/Name/Username'
import CategoryBar from '../../components/Navbar/CategoryBar';
import Navbar from '../../components/Navbar/Navbar'
import OutfitCategory from '../../components/Category/OutfitCategory';
import TopsCategory from '../../components/Category/TopsCategory'
import BottomsCategory from '../../components/Category/BottomsCategory'
import FootwearCategory from '../../components/Category/FootwearCategory'
import OuterwearCategory from '../../components/Category/OuterwearCategory';

const screenHeight = Dimensions.get('window').height;

export default function Profile() {
    const [selectedCategory, setSelectedCategory] = useState('Outfits');

    const handleTitlePress = (title: string) => {
        setSelectedCategory(title);
    };

    return (
        <View style={{ alignItems: 'center' }}>
            <Navbar />
            <View style={{ marginBottom: 25 }}>
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
            <View style={{ gap: 13, alignItems: 'center', flex: 1, }}>
                <CategoryBar handleTitlePress={handleTitlePress} />
                {selectedCategory === 'Outfits' && <OutfitCategory />}
                {selectedCategory === 'Outerwear' && <OuterwearCategory />}
                {selectedCategory === 'Tops' && <TopsCategory />}
                {selectedCategory === 'Bottoms' && <BottomsCategory />}
                {selectedCategory === 'Footwear' && <FootwearCategory />}
            </View>
        </View>
    );
}
