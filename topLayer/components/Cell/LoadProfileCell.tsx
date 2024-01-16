import React, { useState, useEffect, type ReactElement, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { type markedUser, type User } from '../../types/User';
import { baseUrl } from '../../utils/apiUtils';
import axios from 'axios';
import { axiosEndpointErrorHandlerNoAlert } from '../../utils/ErrorHandlers';
import ProfileCell from './ProfileCell';
import { nullUser } from '../../constants/baseUsers';

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
		...nullUser,
		marked: marked,
	});
	const rendered = useRef('not rendered');

	const getUser = async (id: string): Promise<void> => {
		try {
			const { data, status } = await axios.get<{ data: User }>(
				`${baseUrl}/api/users/${id}`
			);

			if (status === 200) {
				rendered.current = 'rendered';
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
			key={rendered.current}
			user={userProcessed}
			handleRelationRender={handleRelationRender}
		/>
	);
};

const styles = StyleSheet.create({});

export default FetchProfileCell;
