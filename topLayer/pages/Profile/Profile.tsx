import React, { useRef, useState, useContext } from 'react';
import { View, Pressable, StyleSheet, FlatList } from 'react-native';

import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import FullName from '../../components/Name/FullName';
import Username from '../../components/Name/Username';
import CategoryBar from '../../components/Category/CategoryBar';
import CategorySlides from '../../components/Category/CategorySlides';
import Navbar from '../../components/Bar/Navbar';

import {
    CategoryToIndex,
    IndexToCategory,
    StackNavigation,
    ClothingTypes,
} from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';
import { mockItemsData } from '../../constants/testData';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { UserClothing } from '../Match';
import { UserOutfit } from '../OutfitView'
import { UserContext } from '../../utils/UserContext';

import { MainPageContext } from '../../pages/Main/MainPage';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
    const flatListRef = useRef<FlatList>(null);

    const [selectedCategory, setSelectedCategory] = useState(ClothingTypes.outfits);
    const { data } = useContext(UserContext);
    const { mockUserData } = useContext(MainPageContext);

    const handleItemChange = (item: UserClothing | UserOutfit) => {
        if ('items' in item) {
            navigation.navigate(StackNavigation.OutfitView, {
                item: item,
                editable: true,
            })
        } else {
            navigation.navigate(StackNavigation.ItemView, {
                item: item,
                editable: true,
            })
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        handleIndexChange(CategoryToIndex[category]);
    };

    const handleIndexChange = (index: number) => {
        if (flatListRef.current != null) {
            flatListRef.current?.scrollToIndex({ index, animated: true });
        }
    };

    const handleViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            const visibleItem = viewableItems[0];
            const index = mockItemsData.findIndex(
                (item) => item.category === visibleItem.item.category
            );
            setSelectedCategory(IndexToCategory[index]);
        }
    }).current;

    const toggleFeedbackModal = () => {
        navigation.navigate(StackNavigation.Feedback, {})
    };

    const toggleSettingsModal = () => {
        navigation.navigate(StackNavigation.Settings, {})
    }

    return (
        <>
            <SafeAreaView>
                <Navbar toggleFeedbackModal={toggleFeedbackModal} />
            </SafeAreaView>
            <View style={{ flex: 1 }}>
                <View style={styles.profilePicture}>
                    <Pressable
                        onPress={() => {
                            toggleSettingsModal()
                        }}
                    >
                        <ProfilePicture imageUrl={data ? data.pp_url : ''} />
                    </Pressable>
                    <View>
                        <FullName firstName={data ? data.first_name : ''} lastName={data ? data.last_name : ''} />
                        <Username username={data ? data.username : ''} />
                        {/* <FullName firstName={mockUserData.firstName} lastName={mockUserData.lastName} />
                        <Username username={mockUserData.username} /> */}
                    </View>
                </View>
                <View style={{ top: 5 }}>
                    <CategoryBar
                        selectedCategory={selectedCategory}
                        handleCategoryChange={handleCategoryChange}
                    />
                    <CategorySlides
                        categorySlidesRef={flatListRef}
                        clothingData={mockItemsData}
                        selectedCategory={selectedCategory}
                        handleItemChange={handleItemChange}
                        handleViewableItemsChanged={handleViewableItemsChanged}
                    />
                </View>
            </View >
        </>
    );
};

const styles = StyleSheet.create({
    bookmarkIconWrapper: {
        position: 'absolute',
        top: 0,
        right: GlobalStyles.layout.xGap,
    },
    profilePicture: {
        alignItems: 'center',
        gap: 7,
        shadowColor: 'black',
        ...GlobalStyles.utils.pfpShadow,
    }
});

export default Profile;
