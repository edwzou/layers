import React, { useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native';

import SearchBar from '../../components/Bar/SearchBar'
import ProfileCell from '../../components/Cell/ProfileCell'

import GlobalStyles from '../../constants/GlobalStyles';
import { find } from '../../constants/GlobalStrings';

type MarkedListPropsType = {
    usersData: Array<any>; /// !!! fix any type
};

const MarkedList = ({ usersData }: MarkedListPropsType) => {

    const [isComponentVisible, setComponentVisible] = useState(true);

    const handleEmptyString = () => {
        setComponentVisible(isComponentVisible => true)
    };

    const handleNonEmptyString = () => {
        setComponentVisible(isComponentVisible => false)
    };

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder={find.searchMarked}
                usersData={usersData}
                handleEmptyString={handleEmptyString}
                handleNonEmptyString={handleNonEmptyString} />
            {isComponentVisible &&
                <FlatList
                    data={usersData}
                    renderItem={({ item }) => (
                        <ProfileCell user={item} />
                    )}
                />
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: GlobalStyles.layout.xGap,
    },
});

export default MarkedList;