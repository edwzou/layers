import React, { useRef, useState, createContext, SetStateAction, Dispatch, useEffect, useContext } from 'react';
import { View, Pressable, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-remix-icon';

import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import FullName from '../../components/Name/FullName';
import Username from '../../components/Name/Username';
import CategoryBar from '../../components/Bar/CategoryBar';
import CategorySlide from '../../components/Category/CategorySlide';
import Navbar from '../../components/Bar/Navbar';

import {
    StepOverTypes,
    CategoryToIndex,
    IndexToCategory,
    ColorTags,
    StackNavigation,
    ClothingTypes,
} from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';
import { clothingData, colorTags } from '../../constants/testData';

import GeneralModal, {
    type refPropType,
} from '../../components/Modal/GeneralModal';
import { highTranslateY } from '../../utils/modalMaxShow';
import SignUpPage from '../SignUp/SignUpPage';
import ItemView from '../../pages/ItemView/ItemView'
import OutfitView from '../../pages/OutfitView/OutfitView';
import OutfitEdit from '../../pages/OutfitEdit/OutfitEdit';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import EditClothing from '../ItemView/EditClothing';
import { UserClothing } from '../Match';
import { UserOutfit } from '../OutfitEdit'
import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../../utils/apiUtils';
import { UserContext } from '../../utils/UserContext';

interface ProfilePropsType {
    selectedItem?: UserClothing;
    setSelectedItem?: Dispatch<SetStateAction<UserClothing>>;
    selectedOutfit?: UserOutfit;
    setSelectedOutfit?: Dispatch<SetStateAction<UserOutfit>>;
    isForeignProfile: boolean;
}

const Profile = ({ selectedItem, setSelectedItem, selectedOutfit, setSelectedOutfit, isForeignProfile }: ProfilePropsType) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
    const itemViewRef = useRef<refPropType>(null);
    const editClothingRef = useRef<refPropType>(null);
    const outfitViewRef = useRef<refPropType>(null);
    const outfitEditRef = useRef<refPropType>(null);
    const flatListRef = useRef<FlatList>(null);

    const [selectedCategory, setSelectedCategory] = useState(ClothingTypes.outfits);

    const { data, updateData } = useContext(UserContext);

    const [iconName, setIconName] = useState(GlobalStyles.icons.bookmarkOutline); //! !! Use user state from backend

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

    const handleIconPress = () => {
        if (iconName === GlobalStyles.icons.bookmarkFill) {
            setIconName(GlobalStyles.icons.bookmarkOutline);
        } else {
            setIconName(GlobalStyles.icons.bookmarkFill);
        }
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

    // !!! Display edit outfit on click
    // !!! Empty Match page to account for no clothing

    return (
        <>
            {!isForeignProfile ? <Navbar toggleFeedbackModal={toggleFeedbackModal} /> : <View style={{ paddingVertical: 20 }} />}
            <View style={{ gap: 25, flex: 1 }}>
                <View style={{ alignItems: 'center', gap: 7 }}>
                    <Pressable
                        onPress={() => {
                            !isForeignProfile
                                // ? navigation.navigate(StackNavigation.Camera)
                                ? toggleSettingsModal()
                                : undefined;
                        }}
                    >
                        <ProfilePicture />
                    </Pressable>
                    <View>
                        <FullName firstName={data.first_name} lastName={data.last_name} />
                        <Username username={`@${data.username}`} />
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
                {isForeignProfile && (
                    <View style={styles.bookmarkIconWrapper}>
                        <Pressable onPress={handleIconPress}>
                            <Icon
                                name={iconName}
                                color={GlobalStyles.colorPalette.primary[900]}
                                size={GlobalStyles.sizing.icon.regular}
                            />
                        </Pressable>
                    </View>
                )}
            </View>
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
