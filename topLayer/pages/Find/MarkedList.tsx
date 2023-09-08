import React, { useState } from 'react';
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
	foreignUsersData: any[]; /// !!! fix any type
}

const MarkedList = ({ foreignUsersData }: MarkedListPropsType) => {

	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const [isComponentVisible, setComponentVisible] = useState(true);

	const handleEmptyString = () => {
		setComponentVisible((isComponentVisible) => true);
	};

	const handleNonEmptyString = () => {
		setComponentVisible((isComponentVisible) => false);
	};

	const handleProfilePress = () => {
		navigation.navigate(StackNavigation.ForeignProfile, {})
	};

	return (
		<View style={styles.container}>
			<SearchBar
				placeholder={find.searchMarked}
				foreignUsersData={foreignUsersData}
				handleEmptyString={handleEmptyString}
				handleNonEmptyString={handleNonEmptyString}
			/>
			{isComponentVisible && (
				<FlatList
					data={foreignUsersData}
					renderItem={({ item }) => <ProfileCell user={item} handleProfilePress={handleProfilePress} />}
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
