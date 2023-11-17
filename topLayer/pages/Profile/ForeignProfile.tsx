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
import { UserAllItems, UserClothing } from '../Match';
import { UserOutfit } from '../OutfitView'
import { UserItems } from 'pages/Main';

import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';
import { User } from '../../pages/Main';

const ForeignProfile = ({ route }: any) => {

    const { userID } = route.params;

    const [user, setUser] = useState<User | null>(null);

    const [allOutfits, setAllOutfits] = useState<UserOutfit[]>([]);
    const [allOuterwear, setAllOuterwear] = useState<UserClothing[]>([]);
    const [allTops, setAllTops] = useState<UserClothing[]>([]);
    const [allBottoms, setAllBottoms] = useState<UserClothing[]>([]);
    const [allShoes, setAllShoes] = useState<UserClothing[]>([]);

    // initializes an array of clothing categories and their data
    const allItems: UserAllItems[] = [
        {
            category: 'outfits',
            data: allOutfits
        },
        {
            category: 'outerwear',
            data: allOuterwear
        },
        {
            category: 'tops',
            data: allTops
        },
        {
            category: 'bottoms',
            data: allBottoms
        },
        {
            category: 'shoes',
            data: allShoes
        },
    ]

    useEffect(() => {
        const getUser = async () => {
            const { data, status } = await axios.get(`${baseUrl}/api/users/${userID}`)

            if (status === 200) {
                return setUser(data.data)
            } else {
                console.log('Failed to fetch foreign user Profile')
            }

            return setUser(null);
        };

        const getAllOutfits = async () => {
            const { data, status } = await axios.get(`${baseUrl}/api/outfits/u/${userID}?parse=categories`);

            if (status === 200) {
                console.log('foreign profile: outfits')
                console.log(data.data)
                return setAllOutfits(data.data);
            }

            console.log('Failed to fetch All Outfits')
            return setAllOutfits([]);
        };

        const getAllClothingItems = async () => {
            const { data, status } = await axios.get(`${baseUrl}/api/clothing_items/u/${userID}?parse=categories`);

            if (status === 200) {
                console.log('foreign profile: clothing')
                console.log(data.data)
                return setAllOuterwear(data.data['outerwear']), setAllTops(data.data['tops']), setAllBottoms(data.data['bottoms']), setAllShoes(data.data['shoes'])
            }

            console.log('Failed to fetch All Clothing Items')
            return setAllOuterwear([]), setAllTops([]), setAllBottoms([]), setAllShoes([]);
        };

        const fetchData = async () => {
            await getUser();
            await getAllOutfits();
            await getAllClothingItems();
        };

        fetchData();

    }, [])

    const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
    const flatListRef = useRef<FlatList>(null);

    const [selectedCategory, setSelectedCategory] = useState(ClothingTypes.outfits as string);

    const [iconName, setIconName] = useState(GlobalStyles.icons.bookmarkFill); //! !! Use user state from backend

    const handleItemChange = (item: UserClothing | UserOutfit) => {
        if ('oid' in item) {
            navigation.navigate(StackNavigation.OutfitView, {
                item: item,
                editable: false,
            });
        } else {
            navigation.navigate(StackNavigation.ItemView, {
                item: item,
                editable: false,
            });
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
            const index = allItems.findIndex(
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
                                allItemsData={allItems}
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
    }
});

export default ForeignProfile;
