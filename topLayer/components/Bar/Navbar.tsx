import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView } from 'react-native';

import Icon from 'react-native-remix-icon';
import GlobalStyles from '../../constants/GlobalStyles';

import * as RootNavigation from '../../RootNavigation';

import { MainPageContext } from '../../pages/Main/MainPage';
import { StackNavigation } from '../../constants/Enums';
import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';
import { UserContext } from '../../utils/UserContext';

interface NavbarPropsType {
	toggleFeedbackModal: () => void;
}

const Navbar = ({ toggleFeedbackModal }: NavbarPropsType) => {
	const { navigationArray } = useContext(MainPageContext);
	const { data, updateData } = useContext(UserContext);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.icons}>
				<Pressable
					onPress={() => {
						navigationArray[1]();
					}}
				>
					<Icon
						name={GlobalStyles.icons.shirtOutline}
						color={GlobalStyles.colorPalette.primary[900]}
						size={GlobalStyles.sizing.icon.regular}
					/>
				</Pressable>
				<Pressable
					onPress={() => {
						toggleFeedbackModal();
					}}
				>
					<Icon
						name={GlobalStyles.icons.feedbackOutline}
						color={GlobalStyles.colorPalette.primary[900]}
						size={GlobalStyles.sizing.icon.regular}
					/>
				</Pressable>
			</View>
			<View style={styles.icons}>
				<Pressable
					onPress={() => {
						RootNavigation.navigate(StackNavigation.Camera, {});
					}}
				>
					<Icon
						name={GlobalStyles.icons.addCircleOutline}
						color={GlobalStyles.colorPalette.primary[900]}
						size={GlobalStyles.sizing.icon.regular}
					/>
				</Pressable>
				<Pressable
					onPress={() => {
						navigationArray[2]();
					}}
				>
					<Icon
						name={GlobalStyles.icons.searchOutline}
						color={GlobalStyles.colorPalette.primary[900]}
						size={GlobalStyles.sizing.icon.regular}
					/>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: GlobalStyles.layout.xGap,
	},
	icons: {
		flexDirection: 'row',
		gap: 28,
	},
});

export default Navbar;
