import React, { useState, useRef, createContext } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import GlobalStyles from '../../constants/GlobalStyles';
import { StackNavigation } from '../../constants/Enums'
import { find } from '../../constants/GlobalStrings';
import { usersData } from '../../constants/testData';

import SearchBar from '../../components/Bar/SearchBar';
import Header from '../../components/Header/Header';
import GeneralModal, { refPropType } from '../../components/Modal/GeneralModal';

import Marked from './Marked';
import MarkedList from './MarkedList';

import Profile from '../../pages/Profile/Profile'

import { highTranslateY, fullTranslateY } from '../../utils/modalMaxShow';


export const ShowProfileContext = createContext(() => { });

const FindPage = () => {

    const markedListModalRef = useRef<refPropType>(null);
    const profileModalRef = useRef<refPropType>(null);

    const [isComponentVisible, setComponentVisible] = useState(true);

    const handlePress = () => {
        markedListModalRef.current?.scrollTo(highTranslateY);
    };

    const handleEmptyString = () => {
        setComponentVisible(isComponentVisible => true)
    };

    const handleNonEmptyString = () => {
        setComponentVisible(isComponentVisible => false)
    };

    const handleProfilePress = () => {
        profileModalRef.current?.scrollTo(fullTranslateY);
    }

    return (
        <ShowProfileContext.Provider value={handleProfilePress}>
            <View style={styles.container}>
                <Header text={StackNavigation.Find} leftArrow={true} />
                <View style={styles.content}>
                    <SearchBar
                        placeholder={find.searchProfiles}
                        usersData={usersData}
                        handleEmptyString={handleEmptyString}
                        handleNonEmptyString={handleNonEmptyString} />
                    {isComponentVisible &&
                        <Pressable onPress={handlePress}>
                            <Marked
                                number={usersData.length}
                                topPfp={usersData[0].profile_picture}
                                middlePfp={usersData[1].profile_picture}
                                bottomPfp={usersData[2].profile_picture}
                            />
                        </Pressable>
                    }
                </View>
            </View>
            <GeneralModal
                title={`${usersData.length} Marked`}
                content={<MarkedList usersData={usersData} />}
                ref={markedListModalRef}
            />
            <GeneralModal
                title={''}
                content={<Profile isForeignProfile={true} />}
                ref={profileModalRef}
            />
        </ShowProfileContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 15,
    },
    content: {
        marginHorizontal: GlobalStyles.layout.xGap,
        gap: 15,
    }
});

export default FindPage;