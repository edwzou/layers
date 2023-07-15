import React from 'react'
import FindBar from '../../components/Bar/SearchBar'
import { StyleSheet, View, FlatList } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import ProfileCell from '../../components/Cell/ProfileCell'
import { usersData } from '../../constants/testData'

const MarkedList = () => {
    return (
        <View style={styles.container}>
            <FindBar placeholder='Search marked' />

            <FlatList
                data={usersData}
                renderItem={({ item }) => (
                    <ProfileCell profilePicture={item.profile_picture} username={item.username} firstName={item.first_name} lastName={item.last_name} />
                )}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: GlobalStyles.layout.xGap,
    },
});

export default MarkedList;