import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import { axiosEndpointErrorHandlerNoAlert } from '../../utils/ErrorHandlers';
import axios from 'axios';
import ProfileCell from '../../components/Cell/ProfileCell';

import { baseUrl } from '../../utils/apiUtils';

import { markedPrivateUser, markedUser, User } from '../../pages/Main';
import SearchBar from './SearchBar';

interface SearchBarPropsType {
	placeholder: string;
	handleEmptyString?: (changes: (string | User)[]) => void;
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
	const userRelations: (string | User)[] = [];

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

	const handleMarking = (
		uid: string,
		marked: boolean,
		index: number,
		user: markedUser
	) => {
		console.log('userRelation: ', userRelations);
		if (index !== -1) {
			userRelations.splice(index, 1);
			return -1;
		} else {
			// The below is only called to mark a new User, whom is 1 of 3 of the users marked
			if (marked) {
				userRelations.push(user as User);
			} else {
				userRelations.push(uid);
			}
		}
		return userRelations.length - 1;
	};

	const handleSearch = (text: string) => {
		console.log('userRelation: ', userRelations);
		setSearchQuery(text);
		if (text === '') {
			setSearchResults([]);
		} else {
			void allSearch(text);
		}
		if (text === '') {
			if (handleEmptyString != null) {
				handleEmptyString(userRelations);
			}
		} else {
			if (handleNonEmptyString != null) {
				handleNonEmptyString();
			}
		}
	};

	const renderProfile = ({
		item,
	}: {
		item: markedUser | markedPrivateUser;
	}) => {
		return <ProfileCell user={item} handleRelationRender={handleMarking} />;
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
