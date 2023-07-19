import React, { useState } from 'react'
import SearchBar from '../../components/Bar/SearchBar'
import { StyleSheet, View, FlatList } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import ProfileCell from '../../components/Cell/ProfileCell'
import { Find } from '../../constants/GlobalStrings';

type MarkedListPropsType = {
    usersData: Array<any>; /// !!! fix any type
};

const MarkedList = ({ usersData }: MarkedListPropsType) => {

    const [isComponentVisible, setComponentVisible] = useState(true);

    const handleSearchBarFocus = () => {
        setComponentVisible(!isComponentVisible)
    };

    const handleSearchBarBlur = () => {
        setComponentVisible(!isComponentVisible)
    };

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder={Find.searchMarked}
                usersData={usersData}
                handleOnFocus={handleSearchBarFocus}
                handleOnBlur={handleSearchBarBlur} />
            {isComponentVisible &&
                <FlatList
                    data={usersData}
                    renderItem={({ item }) => (
                        <ProfileCell profilePicture={item.profile_picture} username={item.username} firstName={item.first_name} lastName={item.last_name} />
                    )}
                />
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: GlobalStyles.layout.xGap,
        gap: GlobalStyles.layout.xGap,
    },
});

export default MarkedList;