import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView } from 'react-native';

import Icon from 'react-native-remix-icon';
import GlobalStyles from '../../constants/GlobalStyles';

import { MainPageContext } from '../../pages/Main/MainPage';
import { UserContext } from '../../utils/UserContext';

import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { StackNavigation } from '../../constants/Enums';
import { navigate } from '../../RootNavigation';

interface NavbarPropsType {
	toggleFeedbackModal: () => void;
}

const Navbar = ({ toggleFeedbackModal }: NavbarPropsType) => {
	const { navigationArray } = useContext(MainPageContext);
	const { data, updateData } = useContext(UserContext);
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const [image, setImage] = useState('');

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
						navigate(StackNavigation.Camera, {
							setImage: setImage,
						});
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
				{/* <Pressable onPress={handleLogout}>
          <Icon
            name={GlobalStyles.icons.circleLogout}
            color={GlobalStyles.colorPalette.primary[900]}
            size={GlobalStyles.sizing.icon.regular}
          />
        </Pressable> */}
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
