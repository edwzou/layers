import React, { useRef, useState } from 'react';
import { View, Pressable, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-remix-icon';

import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import FullName from '../../components/Name/FullName';
import Username from '../../components/Name/Username';
import CategoryBar from '../../components/Bar/CategoryBar';
import CategorySlide from '../../components/Category/CategorySlide';

import {
    ClothingTypes,
    StepOverTypes,
    CategoryToIndex,
    IndexToCategory,
    StackNavigation,
} from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';
import { clothingData } from '../../constants/testData';

import GeneralModal, {
    type refPropType,
} from '../../components/Modal/GeneralModal';
import { highTranslateY } from '../../utils/modalMaxShow';
import ViewOutfit from '../../ModalContent/View/ViewOutfit';
import OutfitEdit from '../../ModalContent/OutfitEdit/OutfitEdit';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';

interface ProfilePropsType {
    isForeignProfile: boolean;
}

const Profile = ({ isForeignProfile }: ProfilePropsType) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
    const previewRef = useRef<refPropType>(null);
    const editModalRef = useRef<refPropType>(null);
    const flatListRef = useRef<FlatList>(null);

    const [selectedCategory, setSelectedCategory] = useState(
        ClothingTypes.outfits
    );
    const [iconName, setIconName] = useState(GlobalStyles.icons.bookmarkOutline); //! !! Use user state from backend

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
            <View style={{ gap: 25, flex: 1 }}>
                <View style={{ alignItems: 'center', gap: 7 }}>
                    <Pressable
                        onPress={() => {
                            !isForeignProfile
                                ? navigation.navigate(StackNavigation.Camera)
                                : undefined;
                        }}
                    >
                        <ProfilePicture />
                    </Pressable>
                    <View>
                        <FullName firstName={'Charlie'} lastName={'Wu'} />
                        <Username username={'_charlie_wu'} />
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
                                    onPress={() => {
                                        editModalRef.current?.scrollTo(highTranslateY);
                                    }}
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
            <GeneralModal
                ref={previewRef}
                content={<ViewOutfit />}
                title="<SOME OUTFIT TITLE>"
                stepOver={{
                    type: StepOverTypes.edit,
                    handlePress: () => {
                        editModalRef.current?.scrollTo(highTranslateY);
                    },
                }}
            />
            <GeneralModal
                ref={editModalRef}
                content={<OutfitEdit />}
                title="Edit <SOME OUTFIT TITLE>"
                back
                stepOver={{
                    type: StepOverTypes.done,
                    handlePress: () => {
                        console.log('some request');
                        editModalRef.current?.scrollTo(0);
                        previewRef.current?.scrollTo(0);
                    },
                }}
            />
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
