import React, { useState, } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import SearchBar from '../../components/Bar/SearchBar';
import ProfileCell from '../../components/Cell/ProfileCell';

import GlobalStyles from '../../constants/GlobalStyles';
import { find } from '../../constants/GlobalStrings';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';

import { StackNavigation } from '../../constants/Enums';

interface MarkedListPropsType {
	foreignUserIDs: string[];
}

const MarkedList = ({ foreignUserIDs }: MarkedListPropsType) => {

	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const [isComponentVisible, setComponentVisible] = useState(true);

	const handleEmptyString = () => {
		setComponentVisible((isComponentVisible) => true);
	};

	const handleNonEmptyString = () => {
		setComponentVisible((isComponentVisible) => false);
	};

	const handleProfilePress = (userID: string) => {
		navigation.navigate(StackNavigation.ForeignProfile, {
			userID: userID,
		})
	};

	return (
		<View style={styles.container}>
			<SearchBar
				placeholder={find.searchMarked}
				foreignUsersData={foreignUserIDs}
				handleEmptyString={handleEmptyString}
				handleNonEmptyString={handleNonEmptyString}
			/>
			{isComponentVisible && (
				<FlatList
					data={foreignUserIDs}
					renderItem={({ item }) => <ProfileCell userID={item} handleProfilePress={() => handleProfilePress(item)} />}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: GlobalStyles.layout.xGap,
	},
});

export default MarkedList;
