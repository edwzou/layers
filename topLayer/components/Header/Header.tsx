import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from 'utils/StackNavigation';
import Icon from 'react-native-remix-icon';
import { NavigationBack } from '../../constants/Enums';

import { MainPageContext } from '../../pages/Main/MainPage';

interface HeaderPropType {
	text: string;
	back?: string;
	rightArrow?: boolean;
	leftArrow?: boolean;
}

const Header: React.FC<HeaderPropType> = ({
	text,
	back,
	rightArrow,
	leftArrow,
}: HeaderPropType) => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const { navigationArray } = useContext(MainPageContext);
	return (
		<SafeAreaView>
			<View style={styles.header}>
				{back ? (
					<Pressable
						onPress={() => {
							navigation.goBack();
						}}
						style={{ position: 'absolute', left: 10, paddingRight: 20 }}
					>
						<Icon
							name={
								back === NavigationBack.back
									? GlobalStyles.icons.backOutline
									: GlobalStyles.icons.closeOutline
							}
							size={GlobalStyles.sizing.icon.regular}
						/>
					</Pressable>
				) : null}

				{leftArrow ? (
					<Pressable
						onPress={() => {
							navigationArray[0]();
						}}
						style={{ position: 'absolute', left: 10, paddingRight: 20 }}
					>
						<Icon
							name={GlobalStyles.icons.backOutline}
							color={GlobalStyles.colorPalette.primary[900]}
							size={GlobalStyles.sizing.icon.regular}
						/>
					</Pressable>
				) : null}

				{rightArrow ? (
					<Pressable
						onPress={() => {
							navigationArray[0]();
						}}
						style={{ position: 'absolute', right: 10, paddingLeft: 20 }}
					>
						<Icon
							name={GlobalStyles.icons.nextOutline}
							color={GlobalStyles.colorPalette.primary[900]}
							size={GlobalStyles.sizing.icon.regular}
						/>
					</Pressable>
				) : null}

				<Text style={GlobalStyles.typography.subtitle}>{text}</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Header;
