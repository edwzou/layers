import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'

import GeneralModal, { refPropType } from '../../components/Modal/GeneralModal'
import OutfitPreview from '../OutfitPreview/OutfitPreview'
import Header from '../../components/Header/Header'
import Selector from './Selector'
import Button from '../../components/Button/Button'

import { StepOverTypes, ClothingTypes, StackNavigation, NavigationBack } from '../../constants/Enums'
import { baseUrl } from '../../utils/apiUtils';
import { maxTranslateY } from '../../utils/modalMaxShow';
import axios from 'axios';

import { UserClothing, UserClothingList, UserClothingListSingle, UserSelectedClothingList } from '.';

import top1 from "../../assets/img1.png"
import pant1 from "../../assets/testPants1.png"
import shoe1 from "../../assets/testShoe1.png"

import top2 from "../../assets/testTop2.png"
import pant2 from "../../assets/img3.png"
import shoe2 from "../../assets/img2.png"

import top3 from "../../assets/testTop3.png"
import pant3 from "../../assets/testPants3.png"
import shoe3 from "../../assets/testShoe3.png"

const MatchPage = () => {
    const userClothing = [
        {
            id: 0,
            image: top1,
            category: ClothingTypes.tops,
        },
        {
            id: 1,
            image: top2,
            category: ClothingTypes.tops,
        },
        {
            id: 2,
            image: top3,
            category: ClothingTypes.tops,
        }, {
            id: 0,
            image: pant1,
            category: ClothingTypes.bottoms,
        },
        {
            id: 1,
            image: pant2,
            category: ClothingTypes.bottoms,
        },
        {
            id: 2,
            image: pant3,
            category: ClothingTypes.bottoms,
        },
        {
            id: 0,
            image: shoe1,
            category: ClothingTypes.shoes,
        },
        {
            id: 1,
            image: shoe2,
            category: ClothingTypes.shoes,
        },
        {
            id: 2,
            image: shoe3,
            category: ClothingTypes.shoes,
        },
    ];

    const modalRef = useRef<refPropType>(null);

    const [selectedIndexes, setSelectedIndexes] = useState<UserSelectedClothingList>({} as UserSelectedClothingList);
    const [matchName, setMatchName] = useState('');
    const [data, setData] = useState<UserClothingList>({
        outerwear: [] as UserClothing[],
        tops: [] as UserClothing[],
        bottoms: [] as UserClothing[],
        shoes: [] as UserClothing[]
    })
    const [previewData, setPreviewData] = useState<UserClothingListSingle>({
        outerwear: {} as UserClothing,
        tops: {} as UserClothing,
        bottoms: {} as UserClothing,
        shoes: {} as UserClothing
    })

    useEffect(() => {
        const filterClothing = (type: string) => {
            return userClothing.filter(value => value.category.toString() === type)
        }

        setData(value => ({ ...value, outerwear: filterClothing(ClothingTypes.outerwear) }))
        setData(value => ({ ...value, tops: filterClothing(ClothingTypes.tops) }))
        setData(value => ({ ...value, bottoms: filterClothing(ClothingTypes.bottoms) }))
        setData(value => ({ ...value, shoes: filterClothing(ClothingTypes.shoes) }))
    }, [])

    useEffect(() => {
        setPreviewData(value => ({ ...value, outerwear: data.outerwear[selectedIndexes.outerwear] }))
        setPreviewData(value => ({ ...value, tops: data.tops[selectedIndexes.tops] }))
        setPreviewData(value => ({ ...value, bottoms: data.bottoms[selectedIndexes.bottoms] }))
        setPreviewData(value => ({ ...value, shoes: data.shoes[selectedIndexes.shoes] }))
    }, [selectedIndexes])

    const selectedIndex = (category: string, index: any) => {
        if (category === ClothingTypes.outerwear) setSelectedIndexes(data => ({ ...data, outerwear: index }));
        if (category === ClothingTypes.tops) setSelectedIndexes(data => ({ ...data, tops: index }));
        if (category === ClothingTypes.bottoms) setSelectedIndexes(data => ({ ...data, bottoms: index }));
        if (category === ClothingTypes.shoes) setSelectedIndexes(data => ({ ...data, shoes: index }));
    }

    const handlePress = () => {
        modalRef.current?.scrollTo(maxTranslateY);
    }

    const handleSubmitOutfit = async () => {
        const clothingItems = [previewData.outerwear, previewData.tops, previewData.bottoms, previewData.shoes].filter(Boolean);

        try {
            const response = await axios.post(`${baseUrl}/outfits`, {
                title: matchName,
                clothing_items: clothingItems,
                uid: 'a45ab439-0dce-448a-9126-43f32f8d56c8' // !!! change to real UID
            });

            if (response.status === 201) {
                alert(`You have created: ${JSON.stringify(response.data)}`);
            } else {
                throw new Error('An error has occurred');
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <View style={{ gap: 15 }}>
                <Header text={StackNavigation.Match} back={NavigationBack.close} />
                <Selector outerwear={data.outerwear} tops={data.tops} bottoms={data.bottoms} shoes={data.shoes} selectedIndex={selectedIndex} />
            </View>
            <Button text='Preview' onPress={handlePress} style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }} />
            <GeneralModal
                title="Preview"
                stepOver={{ type: StepOverTypes.done, handlePress: handleSubmitOutfit }}
                content={<OutfitPreview outerwear={previewData.outerwear} tops={previewData.tops} bottoms={previewData.bottoms} shoes={previewData.shoes} matchName={setMatchName} />}
                ref={modalRef}
            />
        </>
    )
}

export default MatchPage