import React, { useRef, useState, SetStateAction, Dispatch, useContext } from 'react';
import { View, Pressable, StyleSheet, FlatList, Text, Text } from 'react-native';

import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import FullName from '../../components/Name/FullName';
import Username from '../../components/Name/Username';
import CategoryBar from '../../components/Bar/CategoryBar';
import CategorySlide from '../../components/Category/CategorySlide';
import Navbar from '../../components/Bar/Navbar';

import {
    CategoryToIndex,
    IndexToCategory,
    StackNavigation,
    ClothingTypes,
} from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';
import { clothingData } from '../../constants/testData';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { UserClothing } from '../Match';
import { UserOutfit } from '../OutfitEdit'
import { UserContext } from '../../utils/UserContext';

interface ProfilePropsType {
    setSelectedItem?: Dispatch<SetStateAction<UserClothing>>;
    setSelectedOutfit?: Dispatch<SetStateAction<UserOutfit>>;
}

const Profile = ({ setSelectedItem, setSelectedOutfit }: ProfilePropsType) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
    const flatListRef = useRef<FlatList>(null);

    const [selectedCategory, setSelectedCategory] = useState(ClothingTypes.outfits);

    const { data } = useContext(UserContext);
    const [iconName, setIconName] = useState(GlobalStyles.icons.bookmarkOutline);

    const handleItemChange = (outfit: boolean, item: any) => {
        if (outfit && setSelectedOutfit) {
            setSelectedOutfit(item);
            navigation.navigate(StackNavigation.OutfitView, {
                id: undefined,
                initialRouteName: undefined,
                children: null,
                screenListeners: null,
                screenOptions: null
            })
        } else if (setSelectedItem) {
            setSelectedItem(item);
            navigation.navigate(StackNavigation.ItemView, {
                id: undefined,
                initialRouteName: undefined,
                children: null,
                screenListeners: null,
                screenOptions: null
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
            const index = clothingData.findIndex(
                (item) => item.category === visibleItem.item.category
            );
            setSelectedCategory(IndexToCategory[index]);
        }
    }).current;

    const toggleFeedbackModal = () => {
        navigation.navigate(StackNavigation.Feedback, {
            id: undefined,
            initialRouteName: undefined,
            children: null,
            screenListeners: null,
            screenOptions: null
        })
    };

    const toggleSettingsModal = () => {
        navigation.navigate(StackNavigation.Settings, {
            id: undefined,
            initialRouteName: undefined,
            children: null,
            screenListeners: null,
            screenOptions: null
        })
    }

    return (
        <>
            <Navbar toggleFeedbackModal={toggleFeedbackModal} />
            <View style={{ gap: 25, flex: 1 }}>
                <View style={{ alignItems: 'center', gap: 7 }}>
                    <Pressable
                        onPress={() => {
                            toggleSettingsModal()
                        }}
                    >
                        <ProfilePicture />
                    </Pressable>
                    <View>
                        <FullName firstName={data ? data.first_name : ''} lastName={data ? data.last_name : ''} />
                        <Username username={`@${data ? data.username : ''}`} />
                    </View>
                </View>
                <View style={{ gap: 15, flex: 1 }}>
                    <View>
                        <CategoryBar
                            selectedCategory={selectedCategory}
                            onCategoryChange={handleCategoryChange}
                        />
                    </View>
                    <View>
                        <FlatList
                            ref={flatListRef}
                            data={clothingData}
                            renderItem={({ item }) => (
                                <CategorySlide
                                    clothingData={item}
                                    onPress={handleItemChange}
                                />
                            )}
                            horizontal
                            pagingEnabled
                            snapToAlignment="center"
                            showsHorizontalScrollIndicator={false}
                            onViewableItemsChanged={handleViewableItemsChanged}
                            viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
                        />
                    </View>
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

});

export default Profile;
