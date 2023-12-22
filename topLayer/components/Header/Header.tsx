import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from 'utils/StackNavigation';
import Icon from 'react-native-remix-icon';
import { NavigationBack, StepOverTypes } from '../../constants/Enums';

import { MainPageContext } from '../../pages/Main/MainPage';
import { headerButton } from '../../components/Modal/HeaderButton';

interface HeaderPropType {
	text: string;
	back?: boolean;
	rightButton?: boolean;
	leftButton?: boolean;
	rightStepOverType?: string;
	leftStepOverType?: string;
}

const Header: React.FC<HeaderPropType> = ({
	text,
	back,
	rightButton,
	leftButton,
	rightStepOverType = StepOverTypes.rightArrow,
	leftStepOverType = StepOverTypes.leftArrow,
}: HeaderPropType) => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const { navigationArray } = useContext(MainPageContext);
	const handlePress = (): void => {
		if (back) {
			return navigation.goBack();
		}
		navigationArray[0]();
	};
	return (
		<SafeAreaView>
			<View style={styles.header}>
				{leftButton &&
					headerButton({
						type: leftStepOverType,
						handlePress: handlePress,
					})}

				{rightButton &&
					headerButton({
						type: rightStepOverType,
						handlePress: handlePress,
					})}

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
