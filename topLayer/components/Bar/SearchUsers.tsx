import React, { useState, useRef, useEffect } from 'react';
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
import SearchBar from './SearchBar';

interface SearchBarPropsType {
	placeholder: string;
	handleEmptyString?: () => void;
	handleNonEmptyString?: () => void;
}

const SearchUsers = ({
	placeholder,
	handleEmptyString,
	handleNonEmptyString,
}: SearchBarPropsType) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState<
		(markedUser | markedPrivateUser)[]
	>([]);

	const allSearch = async (text: string) => {
		try {
			const { data, status } = await axios.get(
				`${baseUrl}/api/private/search/${text}`
			);

			if (status === 200) {
				// console.log('Successfully Searched For Username');
				// console.log('Data: ', data.data);
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
		setSearchQuery(text);
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
	};

	useEffect(() => {
		console.log('search results update: ', searchResults);
	}, [searchResults]);

	const renderProfile = ({
		item,
	}: {
		item: markedUser | markedPrivateUser;
	}) => {
		return <ProfileCell user={item} />;
	};

	return (
		<View style={{ gap: 0 }}>
			<SearchBar
				placeholder={placeholder}
				searchQuery={searchQuery}
				handleSearch={handleSearch}
			/>
			<FlatList
				data={searchResults}
				renderItem={renderProfile}
				keyExtractor={(item) => item.uid}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default SearchUsers;
