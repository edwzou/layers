import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import SearchBar from '../../components/Bar/SearchBar';
import ProfileCell from '../../components/Cell/ProfileCell';

import GlobalStyles from '../../constants/GlobalStyles';
import { find } from '../../constants/GlobalStrings';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';

import { User } from '../../pages/Main';
import { StackNavigation } from '../../constants/Enums';

interface MarkedListPropsType {
	foreignUserIDs: (User | string)[];
}

const MarkedList = ({ foreignUserIDs }: MarkedListPropsType) => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	console.log('New Load2');
	const [preLoad, setPreLoad] = useState(false);
	useEffect(() => {
		if (!foreignUserIDs.slice(0, 3).some((user) => typeof user === 'string')) {
			console.log('New Load');
			setPreLoad(true);
		}
	}, [foreignUserIDs]);

	const [isComponentVisible, setComponentVisible] = useState(true);
	const handleEmptyString = () => {
		setComponentVisible((isComponentVisible) => true);
	};

	const handleNonEmptyString = () => {
		setComponentVisible((isComponentVisible) => false);
	};

	const renderProfile = ({ item }: { item: User | string }) => {
		console.log('Item', item);

		return <ProfileCell user={item} />;
	};

	return (
		<View style={styles.container}>
			<SearchBar
				placeholder={find.searchMarked}
				foreignUsersData={foreignUserIDs}
				handleEmptyString={handleEmptyString}
				handleNonEmptyString={handleNonEmptyString}
			/>
			{preLoad && <FlatList data={foreignUserIDs} renderItem={renderProfile} />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: GlobalStyles.layout.xGap,
	},
});

export default MarkedList;
