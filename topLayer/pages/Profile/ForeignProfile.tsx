import React, { useRef, useState, SetStateAction, Dispatch } from 'react';
import { View, Pressable, StyleSheet, FlatList, Text } from 'react-native';
import Icon from 'react-native-remix-icon';

import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import FullName from '../../components/Name/FullName';
import Username from '../../components/Name/Username';
import CategoryBar from '../../components/Bar/CategoryBar';
import CategorySlide from '../../components/Category/CategorySlide';

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

interface ForeignProfilePropsType {
    setSelectedItem: Dispatch<SetStateAction<UserClothing>>;
    setSelectedOutfit: Dispatch<SetStateAction<UserOutfit>>;
    isPrivate: boolean;
}

const ForeignProfile = ({ setSelectedItem, setSelectedOutfit, isPrivate }: ForeignProfilePropsType) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
    const flatListRef = useRef<FlatList>(null);

    const [selectedCategory, setSelectedCategory] = useState(ClothingTypes.outfits);

    const [iconName, setIconName] = useState(GlobalStyles.icons.bookmarkOutline); //! !! Use user state from backend

    const handleItemChange = (outfit: boolean, item: any) => {
        console.log("handleItemChange")
        if (outfit) {
            setSelectedOutfit(item);
            navigation.navigate(StackNavigation.OutfitView, {
                id: undefined,
                initialRouteName: undefined,
                children: null,
                screenListeners: null,
                screenOptions: null
            })
        } else {
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

    // !!! Display edit outfit on click
    // !!! Empty Match page to account for no clothing

    return (
        <>
            <View style={{ paddingVertical: 20 }} />
            <View style={{ gap: 25, flex: 1 }}>
                <View style={{ alignItems: 'center', gap: 7 }}>
                    <ProfilePicture />
                    <View>
                        {/* <FullName firstName={data.first_name} lastName={data.last_name} />
                        <Username username={`@${data.username}`} /> */}
                        <FullName firstName={"Joe"} lastName={"Bu"} />
                        <Username username={"joegbu"} />
                    </View>
                </View>
                {isPrivate ? (
                    <View style={{ alignItems: 'center', flex: 1, top: 150, gap: 5 }}>
                        <Icon
                            name={GlobalStyles.icons.privateOutline}
                            color={GlobalStyles.colorPalette.primary[300]}
                            size={GlobalStyles.sizing.icon.large}
                        />
                        <Text style={[GlobalStyles.typography.subtitle, { color: GlobalStyles.colorPalette.primary[300] }]}>Private</Text>
                    </View>
                ) : (
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
                )}
                <View style={styles.bookmarkIconWrapper}>
                    <Pressable onPress={handleIconPress}>
                        <Icon
                            name={iconName}
                            color={GlobalStyles.colorPalette.primary[900]}
                            size={GlobalStyles.sizing.icon.regular}
                        />
                    </Pressable>
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

export default ForeignProfile;
