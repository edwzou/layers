import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { markedUser, User } from '../../pages/Main';
import { baseUrl } from '../../utils/apiUtils';
import axios from 'axios';
import { axiosEndpointErrorHandlerNoAlert } from '../../utils/ErrorHandlers';
import ProfileCell from './ProfileCell';

const defaultUser: User = {
	uid: '',
	first_name: '',
	last_name: '',
	email: '',
	username: '',
	private_option: false,
	followers: [],
	following: [],
	pp_url: '',
};

interface FetchProfileCellPropsType {
	userID: string;
	marked: boolean;
	handleRelationRender: (
		uid: string,
		marked: boolean,
		index: number,
		user: markedUser
	) => number;
}

const FetchProfileCell = ({
	userID,
	marked,
	handleRelationRender,
}: FetchProfileCellPropsType) => {
	const [userProcessed, setUser] = useState<markedUser>({
		...defaultUser,
		marked: marked,
	});

	const getUser = async (id: string) => {
		try {
			const { data, status } = await axios.get(`${baseUrl}/api/users/${id}`);

			if (status === 200) {
				console.log('Successfully fetched foreign user ProfileCell6');
				setUser({
					...data.data,
					marked: marked,
				});

				console.log('fetched user: ', userProcessed);
			} else {
				console.log('Failed to fetch foreign user ProfileCell');
			}
		} catch (error) {
			void axiosEndpointErrorHandlerNoAlert(error);
		}
	};

	useEffect(() => {
		void getUser(userID);
	}, []);

	return (
		<ProfileCell
			user={userProcessed}
			handleRelationRender={handleRelationRender}
		/>
	);
};

const styles = StyleSheet.create({});

export default FetchProfileCell;
