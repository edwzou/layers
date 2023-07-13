import React, { useState } from 'react';
import { View, Pressable } from 'react-native';

import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import FullName from '../../components/Name/FullName'
import Username from '../../components/Name/Username'
import CategoryBar from '../../components/Navbar/CategoryBar';

import ClothingCategory from '../../components/Category/ClothingCategory'
import { ClothingTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

export default function Profile() {
    const [selectedCategory, setSelectedCategory] = useState(ClothingTypes.outfits);

    const handleTitlePress = (title: string) => {
        setSelectedCategory(title);
    };

    return (
        <View style={{ gap: 25 }}>
            <View style={{ alignItems: 'center', gap: 7 }}>
                <Pressable
                    onPress={() => {
                        console.log('PFP Click');
                    }}
                >
                    <ProfilePicture />
                </Pressable>
                <View>
                    <FullName firstName={"Charlie"} lastName={"Wu"} />
                    <Username username={"_charlie_wu"} />
                </View>
            </View>
            <View style={{ gap: 15 }}>
                <CategoryBar handleTitlePress={handleTitlePress} />
                <View style={{ marginHorizontal: GlobalStyles.layout.xGap }}>
                    {selectedCategory === ClothingTypes.outfits && <ClothingCategory category={ClothingTypes.outfits} key={ClothingTypes.outfits} />}
                    {selectedCategory === ClothingTypes.outerwear && <ClothingCategory category={ClothingTypes.outerwear} key={ClothingTypes.outerwear} />}
                    {selectedCategory === ClothingTypes.tops && <ClothingCategory category={ClothingTypes.tops} key={ClothingTypes.tops} />}
                    {selectedCategory === ClothingTypes.bottoms && <ClothingCategory category={ClothingTypes.bottoms} key={ClothingTypes.bottoms} />}
                    {selectedCategory === ClothingTypes.shoes && <ClothingCategory category={ClothingTypes.shoes} key={ClothingTypes.shoes} />}
                </View>
            </View>
        </View>
    );
}
