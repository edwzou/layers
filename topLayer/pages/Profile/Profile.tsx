import React, { useRef, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-remix-icon';

import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import FullName from '../../components/Name/FullName'
import Username from '../../components/Name/Username'
import CategoryBar from '../../components/Bar/CategoryBar';
import ClothingCategory from '../../components/Category/ClothingCategory'

import { ClothingTypes, StepOverTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';
import GeneralModal, { refPropType } from '../../components/Modal/GeneralModal';
import { highTranslateY } from '../../utils/modalMaxShow';
import ViewOutfit from '../../ModalContent/View/ViewOutfit';
import OutfitEdit from '../../ModalContent/OutfitEdit/OutfitEdit';

type ProfilePropsType = {
    isForeignProfile: boolean,
};

const Profile = ({ isForeignProfile }: ProfilePropsType) => {

    const [selectedCategory, setSelectedCategory] = useState(ClothingTypes.outfits);
    const previewRef = useRef<refPropType>(null);
    const editModalRef = useRef<refPropType>(null);
    const [iconName, setIconName] = useState(GlobalStyles.icons.bookmarkOutline); //!!! Use state from backend

    const handleTitlePress = (title: string) => {
        setSelectedCategory(title);
    };

    const handleIconPress = () => {
        if (iconName === GlobalStyles.icons.bookmarkFill) {
            setIconName(GlobalStyles.icons.bookmarkOutline);
        } else {
            setIconName(GlobalStyles.icons.bookmarkFill);
        }
    };

    return (
        <>
            <View style={{ gap: 25, flex: 1 }}>
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
                <View style={{ gap: 15, flex: 1 }}>
                    <View>
                        <CategoryBar handleTitlePress={handleTitlePress} />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: GlobalStyles.layout.xGap, marginBottom: GlobalStyles.layout.xGap * 2 }}>
                        {selectedCategory === ClothingTypes.outfits && <ClothingCategory category={ClothingTypes.outfits} key={ClothingTypes.outfits} onPress={() => { previewRef.current?.scrollTo(highTranslateY) }} />}
                        {selectedCategory === ClothingTypes.outerwear && <ClothingCategory category={ClothingTypes.outerwear} key={ClothingTypes.outerwear} onPress={() => { previewRef.current?.scrollTo(highTranslateY) }} />}
                        {selectedCategory === ClothingTypes.tops && <ClothingCategory category={ClothingTypes.tops} key={ClothingTypes.tops} onPress={() => { previewRef.current?.scrollTo(highTranslateY) }} />}
                        {selectedCategory === ClothingTypes.bottoms && <ClothingCategory category={ClothingTypes.bottoms} key={ClothingTypes.bottoms} onPress={() => { previewRef.current?.scrollTo(highTranslateY) }} />}
                        {selectedCategory === ClothingTypes.shoes && <ClothingCategory category={ClothingTypes.shoes} key={ClothingTypes.shoes} onPress={() => { previewRef.current?.scrollTo(highTranslateY) }} />}
                    </View>
                </View>
            </View>
            {isForeignProfile && (
                <View style={styles.bookmarkIconWrapper}>
                    <Pressable onPress={handleIconPress}>
                        <Icon name={iconName} color={GlobalStyles.colorPalette.primary[900]} size={GlobalStyles.sizing.icon.regular} />
                    </Pressable>
                </View>
            )}
            <GeneralModal ref={previewRef} content={<ViewOutfit />} title='<SOME OUTFIT TITLE>' stepOver={{ type: StepOverTypes.edit, handlePress: () => { editModalRef.current?.scrollTo(highTranslateY) } }} />
            <GeneralModal ref={editModalRef} content={<OutfitEdit />} title='Edit <SOME OUTFIT TITLE>' back stepOver={{ type: StepOverTypes.done, handlePress: () => { console.log('some request'); editModalRef.current?.scrollTo(0); previewRef.current?.scrollTo(0) } }} />
        </>
    );
}

const styles = StyleSheet.create({
    bookmarkIconWrapper: {
        top: 0,
        right: GlobalStyles.layout.xGap,
    },
});

export default Profile;