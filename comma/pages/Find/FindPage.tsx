import React, { useEffect, useRef, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import FindBar from '../../components/Bar/SearchBar'
import Header from '../../components/Header/Header'
import Marked from './Marked'
import GeneralModal, { refPropType } from '../../components/Modal/GeneralModal'
import { maxTranslateY } from '../../utils/modalMaxShow';
import MarkedList from './MarkedList';
import { StyleSheet } from 'react-native'
import { StackNavigation, NavigationBack } from '../../constants/Enums'
import GlobalStyles from '../../constants/GlobalStyles'

import { bottomsData, usersData } from '../../constants/testData'

const ProfilePage = () => {

    const modalRef = useRef<refPropType>(null);

    const handlePress = () => {
        modalRef.current?.scrollTo(maxTranslateY);
    }

    return (
        <>
            <View style={styles.container}>
                <Header text={StackNavigation.Find} back={NavigationBack.close} />
                <FindBar placeholder='Search profiles' />
                <TouchableOpacity onPress={handlePress}>
                    <Marked number={usersData.length} topPfp={usersData[0].profile_picture} middlePfp={usersData[1].profile_picture} bottomPfp={usersData[2].profile_picture} />
                </TouchableOpacity>
            </View>
            <GeneralModal
                title={`${usersData.length} Marked`}
                content={<MarkedList />}
                ref={modalRef}
            />
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: GlobalStyles.layout.xGap,
        gap: 15
    }
});

export default ProfilePage;

