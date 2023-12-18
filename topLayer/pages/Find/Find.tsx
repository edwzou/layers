import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import GlobalStyles from '../../constants/GlobalStyles';
import { StackNavigation } from '../../constants/Enums';
import { find } from '../../constants/GlobalStrings';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';

import Header from '../../components/Header/Header';

import MarkedBar from './Marked';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchUsers from '../../components/Bar/SearchUsers';
import { User } from '../../pages/Main';

interface FindPropsType {
	foreignUserIDs: (string | User)[];
	updateFollowed: (followed: (string | User)[]) => void;
}

const Find = ({ foreignUserIDs, updateFollowed }: FindPropsType) => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const [isComponentVisible, setComponentVisible] = useState(true);

	const handlePress = () => {
		navigation.navigate(StackNavigation.MarkedList, {});
	};

	const handleEmptyString = (relationChanges: (string | User)[]) => {
		const usersToAdd = [];
		const length = foreignUserIDs.length;
		for (const user of relationChanges) {
			if (typeof user === 'string') {
				console.log('unfollow: ', user);
				foreignUserIDs = foreignUserIDs.filter((value) => {
					if (typeof value === 'string') {
						return value !== user;
					} else {
						return value.uid !== user;
					}
				});
			} else {
				console.log('follow: ', user);
				if (user.pp_url !== '') {
					usersToAdd.push(user);
				} else {
					foreignUserIDs.push(user);
				}
			}
		}
		if (usersToAdd.length > 0 || length !== foreignUserIDs.length) {
			console.log('called', usersToAdd, length, foreignUserIDs.length);
			usersToAdd.push(...foreignUserIDs);
			updateFollowed(usersToAdd);
		}
		setComponentVisible(true);
	};

	const handleNonEmptyString = () => {
		setComponentVisible(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Header text={StackNavigation.Find} leftArrow={true} />
			<View style={styles.content}>
				<SearchUsers
					placeholder={find.searchProfiles}
					handleEmptyString={handleEmptyString}
					handleNonEmptyString={handleNonEmptyString}
				/>
				{isComponentVisible && (
					<Pressable onPress={handlePress}>
						<MarkedBar foreignUserIDs={foreignUserIDs} />
					</Pressable>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 15,
	},
	content: {
		marginHorizontal: GlobalStyles.layout.xGap,
		gap: 15,
	},
});

export default Find;
