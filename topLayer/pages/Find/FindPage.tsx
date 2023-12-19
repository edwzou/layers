import { StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import Find from './Find';
import MarkedList from './MarkedList';
import ForeignProfile from '../../pages/Profile/ForeignProfile';

import { Stack } from '../../utils/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigation } from '../../constants/Enums';

import ItemViewPage from '../../pages/ItemView/ItemViewPage';
import OutfitViewPage from '../../pages/OutfitView/OutfitViewPage';

import { UserContext } from '../../utils/UserContext';

import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';
import { getUser } from '../../endpoints/endpoints';
import { User } from '../../pages/Main';
import { previewLength } from '../../constants/Find';

const FindPage = () => {
	console.log('rerender');
	const { data } = useContext(UserContext);
	// this only gets the foreignUsersData from UserContext on initial load
	let foreignUsersIDs: string[] = data && data.following ? data.following : [];
	const [followedUsersData, setFollowed] =
		useState<(string | User)[]>(foreignUsersIDs);

	const updateFollowed = (followed: (string | User)[]) => {
		setFollowed(followed);
	};

	useEffect(() => {
		const get3Users = async () => {
			try {
				const top3Users = await Promise.all(
					followedUsersData
						.slice(0, previewLength)
						.map((user: string | User) => {
							if (typeof user === 'string') {
								return getUser(user);
							} else {
								return user;
							}
						})
				);
				setFollowed(top3Users.concat(followedUsersData.slice(previewLength)));
			} catch (error) {
				void axiosEndpointErrorHandler(error);
			}
		};

		if (
			followedUsersData
				.slice(0, previewLength)
				.some((user) => typeof user === 'string')
		) {
			console.log('test1', followedUsersData.slice(0, previewLength));
			void get3Users();
		}
	}, [followedUsersData]);

	const FindHomePage = () => {
		console.log('Following', followedUsersData);
		return (
			<Find
				foreignUserIDs={followedUsersData}
				updateFollowed={updateFollowed}
			/>
		);
	};
	const MarkedListComponent = () => (
		<MarkedList
			foreignUserIDs={followedUsersData}
			updateFollowed={updateFollowed}
		/>
	);

	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator>
				<Stack.Screen
					name={StackNavigation.Find}
					component={FindHomePage}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Group
					screenOptions={{
						presentation: 'modal',
					}}
				>
					<Stack.Screen
						name={StackNavigation.MarkedList}
						component={MarkedListComponent}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={StackNavigation.ForeignProfile}
						component={ForeignProfile}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={StackNavigation.ItemView}
						component={ItemViewPage}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={StackNavigation.OutfitView}
						component={OutfitViewPage}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default FindPage;

const styles = StyleSheet.create({});
