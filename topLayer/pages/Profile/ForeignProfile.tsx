import React, { useRef, useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, FlatList, Text } from 'react-native';
import Icon from 'react-native-remix-icon';

import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import FullName from '../../components/Name/FullName';
import Username from '../../components/Name/Username';
import CategoryBar from '../../components/Category/CategoryBar';
import CategorySlides from '../../components/Category/CategorySlides';

import {
    CategoryToIndex,
    IndexToCategory,
    StackNavigation,
    ClothingTypes,
} from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { UserClothing } from '../Match';
import { UserOutfit } from '../OutfitView'
import { UserItems } from 'pages/Main';

import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';
import { User } from '../../pages/Main';

const ForeignProfile = ({ route }: any) => {

    const { userID } = route.params;

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data, status } = await axios.get(`${baseUrl}/api/users/${userID}`)

            if (status === 200) {
                console.log('Successfully fetched foreign user Profile')
                console.log('privacy: ' + data.data[0].private_option)
                return setUser(data.data[0])
            } else {
                console.log('Failed to fetch foreign user Profile')
            }

            return setUser(null);
        };

        void getUser();
    }, [])

    const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
    const flatListRef = useRef<FlatList>(null);

    const [selectedCategory, setSelectedCategory] = useState(ClothingTypes.outfits);

    const [iconName, setIconName] = useState(GlobalStyles.icons.bookmarkFill); //! !! Use user state from backend

    const handleItemChange = (item: UserClothing | UserOutfit) => {
        if ('items' in item) {
            navigation.navigate(StackNavigation.OutfitView, {
                item: item,
                editable: false,
            })
        } else {
            navigation.navigate(StackNavigation.ItemView, {
                item: item,
                editable: false,
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
            const index = userID.items.findIndex(
                (item: UserItems) => item.category === visibleItem.item.category
            );
            setSelectedCategory(IndexToCategory[index]);
        }
    }).current;

    // !!! Display edit outfit on click
    // !!! Empty Match page to account for no clothing

    return (
        <>
            <View style={{ paddingVertical: 20 }} />
            <View style={{ flex: 1 }}>
                <View style={styles.profilePicture}>
                    <ProfilePicture imageUrl={user ? user.pp_url : ''} />
                    <View>
                        {/* <FullName firstName={data.first_name} lastName={data.last_name} />
                        <Username username={`@${data.username}`} /> */}
                        <FullName firstName={user ? user.first_name : ''} lastName={user ? user.last_name : ''} />
                        <Username username={user ? user.username : ''} />
                    </View>
                </View>
                {
                    user && user.private_option ? (
                        <View style={{ alignItems: 'center', flex: 1, top: GlobalStyles.layout.pageStateTopMargin, gap: 5 }}>
                            <Icon
                                name={GlobalStyles.icons.privateOutline}
                                color={GlobalStyles.colorPalette.primary[300]}
                                size={GlobalStyles.sizing.icon.large}
                            />
                            <Text style={[GlobalStyles.typography.subtitle, { color: GlobalStyles.colorPalette.primary[300] }]}>Private</Text>
                        </View>
                    ) : (
                        <View style={{ top: 5 }}>
                            <CategoryBar
                                selectedCategory={selectedCategory}
                                handleCategoryChange={handleCategoryChange}
                            />
                            <CategorySlides
                                categorySlidesRef={flatListRef}
                                clothingData={[]} /// !!! ENTER IN REAL DATA
                                selectedCategory={selectedCategory}
                                handleItemChange={handleItemChange}
                                handleViewableItemsChanged={handleViewableItemsChanged}
                            />
                        </View>
                    )
                }

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
    profilePicture: {
        alignItems: 'center',
        gap: 7,
        shadowColor: 'black',
        ...GlobalStyles.utils.pfpShadow,
    }
});

export default ForeignProfile;
