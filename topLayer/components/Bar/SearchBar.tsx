import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-remix-icon';

import ProfileCell from '../../components/Cell/ProfileCell';

import GlobalStyles from '../../constants/GlobalStyles';

type SearchBarPropsType = {
    placeholder: string;
    usersData: Array<any>; /// !!! fix any type
    handleEmptyString?: () => void;
    handleNonEmptyString?: () => void;
};

const SearchBar = ({ placeholder, usersData, handleEmptyString, handleNonEmptyString }: SearchBarPropsType) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Array<any>>([]);
    const textInputRef = useRef<TextInput>(null);

    const handleSearch = (text: string) => {

        if (text === '') {
            if (handleEmptyString) {
                handleEmptyString()
            }
        } else {
            if (handleNonEmptyString) {
                handleNonEmptyString()
            }
        }

        setSearchQuery(text);

        /// !!! search doesn't account for full name
        const filteredResults = usersData.filter(
            (user) =>
                user.username.toLowerCase().includes(text.toLowerCase()) ||
                user.first_name.toLowerCase().includes(text.toLowerCase()) ||
                user.last_name.toLowerCase().includes(text.toLowerCase())
        );

        setSearchResults(text.trim() === '' ? [] : filteredResults);
    };

    return (
        <View style={{ gap: 0 }}>
            <View style={styles.searchBar} >
                <Icon
                    name={GlobalStyles.icons.searchOutline}
                    color={GlobalStyles.colorPalette.primary[400]}
                    size={GlobalStyles.sizing.icon.small}
                />
                <TextInput
                    ref={textInputRef}
                    style={{ flex: 1, ...GlobalStyles.typography.body }}
                    placeholder={placeholder}
                    placeholderTextColor={GlobalStyles.colorPalette.primary[400]}
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            <FlatList
                data={searchResults}
                renderItem={({ item }) => (
                    <ProfileCell
                        user={item}
                    />
                )}
                keyExtractor={(item) => item.uid}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: GlobalStyles.colorPalette.primary[200],
        borderRadius: 10,
        gap: 17,
    }
});

export default SearchBar;
