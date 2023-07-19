import React, { useState, useRef } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import SearchBar from '../../components/Bar/SearchBar';
import Header from '../../components/Header/Header';
import Marked from './Marked';
import GeneralModal, { refPropType } from '../../components/Modal/GeneralModal';
import { maxTranslateY } from '../../utils/modalMaxShow';
import MarkedList from './MarkedList';
import { StackNavigation, NavigationBack } from '../../constants/Enums'
import { Find } from '../../constants/GlobalStrings';

import { usersData } from '../../constants/testData';

const FindPage = () => {

    const [isComponentVisible, setComponentVisible] = useState(true);

    const modalRef = useRef<refPropType>(null);

    const handlePress = () => {
        modalRef.current?.scrollTo(maxTranslateY);
    };

    const handleSearchBarFocus = () => {
        setComponentVisible(!isComponentVisible)
    };

    const handleSearchBarBlur = () => {
        setComponentVisible(!isComponentVisible)
    };

    return (
        <>
            <View style={styles.container}>
                <Header text={StackNavigation.Find} back={NavigationBack.close} />
                <SearchBar
                    placeholder={Find.searchProfiles}
                    usersData={usersData}
                    handleOnFocus={handleSearchBarFocus}
                    handleOnBlur={handleSearchBarBlur} />
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
            <GeneralModal
                title={`${usersData.length} Marked`}
                content={<MarkedList usersData={usersData} />}
                ref={modalRef}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: GlobalStyles.layout.xGap,
        gap: 15,
    },
});

export default FindPage;