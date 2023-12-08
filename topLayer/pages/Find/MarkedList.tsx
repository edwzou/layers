import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import ProfileCell from '../../components/Cell/ProfileCell';

import GlobalStyles from '../../constants/GlobalStyles';

import { User } from '../../pages/Main';
import FetchProfileCell from '../../components/Cell/LoadProfileCell';

interface MarkedListPropsType {
	foreignUserIDs: (User | string)[];
}

const MarkedList = ({ foreignUserIDs }: MarkedListPropsType) => {
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
		setComponentVisible(true);
	};

	const handleNonEmptyString = () => {
		setComponentVisible(false);
	};

	const renderProfile = ({ item }: { item: User | string }) => {
		console.log('Item', item);
		if (typeof item !== 'string') {
			return (
				<ProfileCell
					user={{
						...item,
						marked: true,
					}}
				/>
			);
		}
		return <FetchProfileCell userID={item} marked={true} />;
	};

	return (
		<View style={styles.container}>
			{/* the search bar for markedlist will behave different searching only the marked list for followers. */}
			{/* <SearchBar */}
			{/* 	placeholder={find.searchMarked} */}
			{/* 	foreignUsersData={foreignUserIDs} */}
			{/* 	handleEmptyString={handleEmptyString} */}
			{/* 	handleNonEmptyString={handleNonEmptyString} */}
			{/* /> */}
			{preLoad && isComponentVisible && (
				<FlatList
					data={foreignUserIDs}
					renderItem={renderProfile}
					keyExtractor={(item) => {
						if (typeof item === 'string') {
							return item;
						} else {
							return item.uid;
						}
					}}
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
