import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-remix-icon';

import ProfileCell from '../../components/Cell/ProfileCell';

import GlobalStyles from '../../constants/GlobalStyles';


import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';

import { StackNavigation } from '../../constants/Enums';

import { User } from '../../pages/Main';

interface SearchBarPropsType {
	placeholder: string;
	foreignUsersData: any[]; // !!! fix any type
	handleEmptyString?: () => void;
	handleNonEmptyString?: () => void;
}

const SearchBar = ({
	placeholder,
	foreignUsersData,
	handleEmptyString,
	handleNonEmptyString,
}: SearchBarPropsType) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState<any[]>([]);
	const textInputRef = useRef<TextInput>(null);

	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const handleSearch = (text: string) => {
		if (text === '') {
			if (handleEmptyString != null) {
				handleEmptyString();
			}
		} else {
			if (handleNonEmptyString != null) {
				handleNonEmptyString();
			}
		}

		setSearchQuery(text);

		/// !!! search doesn't account for full name
		const filteredResults = foreignUsersData.filter(
			(user) =>
				user.username.toLowerCase().includes(text.toLowerCase()) ||
				user.firstName.toLowerCase().includes(text.toLowerCase()) ||
				user.lastName.toLowerCase().includes(text.toLowerCase())
		);

		setSearchResults(text.trim() === '' ? [] : filteredResults);
	};

	const handleProfilePress = (user: User) => {
		navigation.navigate(StackNavigation.ForeignProfile, {
			user: user,
		})
	};

	return (
		<View style={{ gap: 0 }}>
			<View style={styles.searchBar}>
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
				renderItem={({ item }) => <ProfileCell user={item} handleProfilePress={() => handleProfilePress(item)} />}
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
		gap: GlobalStyles.layout.gap,
	},
});

export default SearchBar;
