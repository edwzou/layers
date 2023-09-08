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

export const ShowProfileContext = createContext(() => { });

interface FindPropsType {
	foreignUsersData: any[]; //!!! Fix any type
}

const Find = ({ foreignUsersData }: FindPropsType) => {

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
					foreignUsersData={foreignUsersData}
					handleEmptyString={handleEmptyString}
					handleNonEmptyString={handleNonEmptyString}
				/>
				{isComponentVisible && (
					<Pressable onPress={handlePress}>
						<Marked
							number={foreignUsersData.length}
							topPfp={foreignUsersData[0].profile_picture}
							middlePfp={foreignUsersData[1].profile_picture}
							bottomPfp={foreignUsersData[2].profile_picture}
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
