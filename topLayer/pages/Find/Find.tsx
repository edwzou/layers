import React, { type ReactElement, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { StackNavigation } from '../../constants/Enums';
import { find } from '../../constants/GlobalStrings';
import Header from '../../components/Header/Header';
import MarkedBar from './Marked';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchUsers from '../../components/Bar/SearchUsers';
import { type User } from '../../types/User';

interface FindPropsType {
	foreignUserIDs: Array<string | User>;
	updateFollowed: (followed: Array<string | User>) => void;
}

const Find = ({
	foreignUserIDs,
	updateFollowed,
}: FindPropsType): ReactElement => {
	const [isComponentVisible, setComponentVisible] = useState(true);

	const handleEmptyString = (relationChanges: Array<string | User>): void => {
		const length = foreignUserIDs.length;
		const usersToAdd = [];
		let foreignUserCopy = [...foreignUserIDs];
		for (const user of relationChanges) {
			if (typeof user === 'string') {
				foreignUserCopy = foreignUserCopy.filter((value) => {
					if (typeof value === 'string') {
						return value !== user;
					} else {
						return value.uid !== user;
					}
				});
			} else {
				usersToAdd.push(user);
			}
		}
		if (usersToAdd.length > 0 || length !== foreignUserCopy.length) {
			usersToAdd.push(...foreignUserCopy);
			updateFollowed(usersToAdd);
		}
		setComponentVisible(true);
	};

	const handleNonEmptyString = (): void => {
		setComponentVisible(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Header
				text={StackNavigation.Find}
				leftButton={true}
				leftButtonNavigateTo={0}
			/>
			<View style={styles.content}>
				<SearchUsers
					placeholder={find.searchProfiles}
					handleEmptyString={handleEmptyString}
					handleNonEmptyString={handleNonEmptyString}
				/>

				{isComponentVisible ? (
					<MarkedBar foreignUserIDs={foreignUserIDs} />
				) : null}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 15,
	},
	content: {
		marginHorizontal: GlobalStyles.layout.xGap,
		gap: 15,
	},
});

export default Find;
