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

import { screenHeight } from '../../utils/modalMaxShow';

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
				foreignUserIDs = foreignUserIDs.filter((value) => {
					if (typeof value === 'string') {
						return value !== user;
					} else {
						return value.uid !== user;
					}
				});
			} else {
				if (user.pp_url !== '') {
					usersToAdd.push(user);
				} else {
					foreignUserIDs.push(user);
				}
			}
		}
		if (usersToAdd.length > 0 || length !== foreignUserIDs.length) {
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
					// This 'style={{ top: -screenHeight * 0.20 }}' is SUPER HACKY and should be fixed ASAP
					// Basically, the Flatlist on SearchUsers.tsx won't fully scroll down for some reason
					// I can add ListFooterComponent padding on the bottom of that flatlist
					// But then it'll leave that padding over this Marked component
					// This 'style={{ top: -screenHeight * 0.20 }}' is meant to offset that padding from the Flatlist
					// If you can find a cleaner way to fully scroll down in SearchUsers.tsx, please use that instead!
					// Before this chage the bottom 3 users outside the screen can't be seen
					// currently this solution does fail sometimes
					<Pressable onPress={handlePress} style={{ top: -screenHeight * 0.16 }}>
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
		flex: 1,
	},
	content: {
		marginHorizontal: GlobalStyles.layout.xGap,
		gap: 15,
	},
});

export default Find;
