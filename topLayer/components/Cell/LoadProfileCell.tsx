import React, { useState, useEffect, type ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import { type markedUser, type User } from '../../types/User';
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
	profile_picture: '',
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
}: FetchProfileCellPropsType): ReactElement => {
	const [userProcessed, setUser] = useState<markedUser>({
		...defaultUser,
		marked: marked,
	});

	const getUser = async (id: string): Promise<void> => {
		try {
			const { data, status } = await axios.get(`${baseUrl}/api/users/${id}`);

			if (status === 200) {
				setUser({
					...data.data,
					marked: marked,
				});
			}
		} catch (error) {
			axiosEndpointErrorHandlerNoAlert(error);
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
