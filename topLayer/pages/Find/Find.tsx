import React, { useState, createContext } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import GlobalStyles from '../../constants/GlobalStyles';
import { StackNavigation } from '../../constants/Enums';
import { find } from '../../constants/GlobalStrings';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';

import SearchBar from '../../components/Bar/SearchBar';
import Header from '../../components/Header/Header';

import Marked from './Marked';

import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from '../../pages/Main';

export const ShowProfileContext = createContext(() => { });

interface FindPropsType {
	foreignUserIDs: string[];
}

const Find = ({ foreignUserIDs }: FindPropsType) => {

	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const [isComponentVisible, setComponentVisible] = useState(true);

	const handlePress = () => {
		navigation.navigate(StackNavigation.MarkedList, {})
	};

	const handleEmptyString = () => {
		setComponentVisible((isComponentVisible) => true);
	};

	const handleNonEmptyString = () => {
		setComponentVisible((isComponentVisible) => false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Header text={StackNavigation.Find} leftArrow={true} />
			<View style={styles.content}>
				<SearchBar
					placeholder={find.searchProfiles}
					foreignUsersData={foreignUserIDs}
					handleEmptyString={handleEmptyString}
					handleNonEmptyString={handleNonEmptyString}
				/>
				{isComponentVisible && (
					<Pressable onPress={handlePress}>
						<Marked
							foreignUserIDs={foreignUserIDs}
						/>
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
