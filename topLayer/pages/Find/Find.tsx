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
	usersData: any[]; //!!! Fix any type
}

const Find = ({ usersData }: FindPropsType) => {

	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const [isComponentVisible, setComponentVisible] = useState(true);

	const handlePress = () => {
		navigation.navigate(StackNavigation.MarkedList, {
			id: undefined,
			initialRouteName: undefined,
			children: null,
			screenListeners: null,
			screenOptions: null
		})
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
					usersData={usersData}
					handleEmptyString={handleEmptyString}
					handleNonEmptyString={handleNonEmptyString}
				/>
				{isComponentVisible && (
					<Pressable onPress={handlePress}>
						<Marked
							number={usersData.length}
							topPfp={usersData[0].profile_picture}
							middlePfp={usersData[1].profile_picture}
							bottomPfp={usersData[2].profile_picture}
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
