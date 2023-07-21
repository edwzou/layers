import React, { useRef, useState } from 'react';
import { View, Pressable } from 'react-native';

import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import FullName from '../../components/Name/FullName'
import Username from '../../components/Name/Username'
import CategoryBar from '../../components/Bar/CategoryBar';

import ClothingCategory from '../../components/Category/ClothingCategory'
import { ClothingTypes, StepOverTypes } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';
import GeneralModal, { refPropType } from '../../components/Modal/GeneralModal';
import { maxTranslateY } from '../../utils/modalMaxShow';
import ViewOutfit from '../../ModalContent/View/ViewOutfit';
import OutfitEdit from '../../ModalContent/OutfitEdit/OutfitEdit';

export default function Profile() {
    const [selectedCategory, setSelectedCategory] = useState(ClothingTypes.outfits);
    const previewRef = useRef<refPropType>(null);
    const editModalRef = useRef<refPropType>(null);

    const handleTitlePress = (title: string) => {
        setSelectedCategory(title);
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
                        {selectedCategory === ClothingTypes.outfits && <ClothingCategory category={ClothingTypes.outfits} key={ClothingTypes.outfits} onPress={() => { previewRef.current?.scrollTo(maxTranslateY) }} />}
                        {selectedCategory === ClothingTypes.outerwear && <ClothingCategory category={ClothingTypes.outerwear} key={ClothingTypes.outerwear} onPress={() => { previewRef.current?.scrollTo(maxTranslateY) }} />}
                        {selectedCategory === ClothingTypes.tops && <ClothingCategory category={ClothingTypes.tops} key={ClothingTypes.tops} onPress={() => { previewRef.current?.scrollTo(maxTranslateY) }} />}
                        {selectedCategory === ClothingTypes.bottoms && <ClothingCategory category={ClothingTypes.bottoms} key={ClothingTypes.bottoms} onPress={() => { previewRef.current?.scrollTo(maxTranslateY) }} />}
                        {selectedCategory === ClothingTypes.shoes && <ClothingCategory category={ClothingTypes.shoes} key={ClothingTypes.shoes} onPress={() => { previewRef.current?.scrollTo(maxTranslateY) }} />}
                    </View>
                </View>
            </View>
            <GeneralModal ref={previewRef} content={<ViewOutfit />} title='<SOME OUTFIT TITLE>' stepOver={{ type: StepOverTypes.edit, handlePress: () => { editModalRef.current?.scrollTo(maxTranslateY) } }} />
            <GeneralModal ref={editModalRef} content={<OutfitEdit />} title='Edit <SOME OUTFIT TITLE>' stepOver={{ type: StepOverTypes.done, handlePress: () => { console.log('some request'); editModalRef.current?.scrollTo(0); previewRef.current?.scrollTo(0) } }} />
        </>
    );
}
