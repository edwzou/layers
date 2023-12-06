import { StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';

import Find from './Find';
import MarkedList from './MarkedList';
import ForeignProfile from '../../pages/Profile/ForeignProfile';

import { Stack } from '../../utils/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigation } from '../../constants/Enums';
import GlobalStyles from '../../constants/GlobalStyles';

// import { foreignUsersData } from '../../constants/testData';

import ItemViewPage from '../../pages/ItemView/ItemViewPage';
import OutfitViewPage from '../../pages/OutfitView/OutfitViewPage';

import { UserContext } from '../../utils/UserContext';
import { User } from '../../pages/Main';

import { baseUrl } from '../../utils/apiUtils';
import axios from 'axios';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';

const FindPage = () => {
	const { data } = useContext(UserContext);
	// this only gets the foreignUsersData from UserContext on initial load
	let foreignUsersIDs: any[] = data && data.following ? data.following : [];
	// const [foreignUsersData, updateForeignUsers] = useState(foreignUsersIDs);
	let foreignUsersData = useRef<any[]>(foreignUsersIDs);
	const [rerender, updateReRender] = useState(false);

	const getUser = async (userId: string) => {
		try {
			const { data, status } = await axios.get(
				`${baseUrl}/api/users/${userId}`
			);

			if (status === 200) {
				return data.data;
			}
		} catch (error) {
			void axiosEndpointErrorHandler(error);
		}
	};

	useEffect(() => {
		const get3Users = async () => {
			try {
				const top3Users = await Promise.all(
					foreignUsersData.current.slice(0, 3).map((user) => {
						if (user.uid) {
							return user;
						} else {
							return getUser(user);
							// return user;
						}
					})
				);
				foreignUsersData.current = top3Users.concat(
					foreignUsersData.current.slice(3)
				);
				updateReRender(!rerender);
			} catch (error) {
				void axiosEndpointErrorHandler(error);
			}
		};

		if (foreignUsersData.current.slice(0, 3).some((user) => !user.uid)) {
			console.log('test1', foreignUsersData.current.slice(0, 3));
			void get3Users();
		}
	}, [foreignUsersData.current]);

	const FindComponent = () => {
		console.log('Following', foreignUsersData);
		return <Find foreignUserIDs={foreignUsersData.current} />;
	};
	const MarkedListComponent = () => (
		<MarkedList foreignUserIDs={foreignUsersData.current} />
	);

	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator>
				<Stack.Group
					screenOptions={{
						headerTitleStyle: GlobalStyles.typography.subtitle,
						headerStyle: {
							backgroundColor: GlobalStyles.colorPalette.background,
						},
						headerShadowVisible: false,
					}}
				>
					<Stack.Screen
						name={StackNavigation.Find}
						component={FindComponent}
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
								headerTitle: `${
									data ? (data.following ? data.following.length : 0) : 0
								} Marked`,
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
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default FindPage;

const styles = StyleSheet.create({});
