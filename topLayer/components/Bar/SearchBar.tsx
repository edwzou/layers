import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-remix-icon';
import {
	axiosEndpointErrorHandler,
	axiosEndpointErrorHandlerNoAlert,
} from '../../utils/ErrorHandlers';
import axios from 'axios';
import ProfileCell from '../../components/Cell/ProfileCell';

import { baseUrl } from '../../utils/apiUtils';
import GlobalStyles from '../../constants/GlobalStyles';

import { markedPrivateUser, markedUser, User } from '../../pages/Main';

interface SearchBarPropsType {
	placeholder: string;
	handleEmptyString?: () => void;
	handleNonEmptyString?: () => void;
}

const SearchBar = ({
	placeholder,
	handleEmptyString,
	handleNonEmptyString,
}: SearchBarPropsType) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState<
		(markedUser | markedPrivateUser)[]
	>([]);
	const textInputRef = useRef<TextInput>(null);

	const allSearch = async (text: string) => {
		try {
			const { data, status } = await axios.get(
				`${baseUrl}/api/private/search/${text}`
			);

			if (status === 200) {
				console.log('Successfully Searched For Username');
				console.log('Data: ', data.data);
				setSearchResults(data.data);
			} else {
				console.log('Failed to fetch foreign user ProfileCell');
			}
		} catch (error) {
			void axiosEndpointErrorHandlerNoAlert(error);
			setSearchResults([]);
		}
	};

	const handleSearch = (text: string) => {
		if (text === '') {
			setSearchResults([]);
		} else {
			void allSearch(text);
		}
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
	};

	const renderProfile = ({
		item,
	}: {
		item: markedUser | markedPrivateUser;
	}) => {
		const user: User = {
			...item,
		} as User;
		return <ProfileCell user={user} marked={item.marked} />;
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
				renderItem={renderProfile}
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
