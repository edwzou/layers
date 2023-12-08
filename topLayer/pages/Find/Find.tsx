import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import GlobalStyles from '../../constants/GlobalStyles';
import { StackNavigation } from '../../constants/Enums';
import { find } from '../../constants/GlobalStrings';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';

import Header from '../../components/Header/Header';

import Marked from './Marked';

import { SafeAreaView } from 'react-native-safe-area-context';
import SearchUsers from '../../components/Bar/SearchUsers';

interface FindPropsType {
	foreignUserIDs: any[];
}

const Find = ({ foreignUserIDs }: FindPropsType) => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const [isComponentVisible, setComponentVisible] = useState(true);

	const handlePress = () => {
		navigation.navigate(StackNavigation.MarkedList, {});
	};

	const handleEmptyString = () => {
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
						<Marked foreignUserIDs={foreignUserIDs} />
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
