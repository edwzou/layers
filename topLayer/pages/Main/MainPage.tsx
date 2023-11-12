import { StyleSheet } from 'react-native';
import React, { createContext, useRef, useEffect, useState } from 'react';
import PagerView from 'react-native-pager-view';

import ProfilePage from '../Profile/ProfilePage';
import MatchPage from '../Match/MatchPage';
import FindPage from '../Find/FindPage';

import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';
import { UserOutfit } from '../../pages/OutfitView';
import { UserAllItems, UserClothing } from '../../pages/Match';

export const MainPageContext = createContext({
    navigationArray: [() => { }],
    allItems: [] as UserAllItems[],
});

const MainPage: React.FC = () => {

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

    // fetched all the outfits and clothings
    useEffect(() => {

        const getAllOutfits = async () => {
            const { data, status } = await axios.get(`${baseUrl}/api/private/outfits?parse=categories`);

            if (status === 200) {
                return setAllOutfits(data.data);
            }

            return setAllOutfits([]);
        };

        const getAllClothingItems = async () => {
            const { data, status } = await axios.get(`${baseUrl}/api/private/clothing_items?parse=categories`);

            if (status === 200) {
                return setAllOuterwear(data.data['outerwear']), setAllTops(data.data['tops']), setAllBottoms(data.data['bottoms']), setAllShoes(data.data['shoes'])
            }

            return setAllOuterwear([]), setAllTops([]), setAllBottoms([]), setAllShoes([]);
        };

        void getAllOutfits();
        void getAllClothingItems();
    }, []);

    const ref = useRef<PagerView>(null);
    const navigateToProfile = (): void => {
        ref.current?.setPage(1);
    };
    const navigateToMatch = (): void => {
        ref.current?.setPage(0);
    };
    const navigateToFind = (): void => {
        ref.current?.setPage(2);
    };

    return (
        <MainPageContext.Provider
            value={{
                navigationArray: [navigateToProfile, navigateToMatch, navigateToFind],
                allItems: allItems
            }}
        >
            <PagerView style={styles.pager} ref={ref} initialPage={1}>
                <MatchPage />
                <ProfilePage />
                <FindPage />
            </PagerView>
        </MainPageContext.Provider>
    );
};

export default MainPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pager: {
        flex: 1,
        alignSelf: 'stretch',
    },
});
