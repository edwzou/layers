import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from 'utils/StackNavigation';
import { StepOverTypes } from '../../constants/Enums';

import { MainPageContext } from '../../pages/Main/MainPage';
import { headerButtons } from './headerButtons';

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
					headerButtons({
						type: leftStepOverType,
						left: true,
						handlePress: handlePress,
					})}

				{rightButton &&
					headerButtons({
						type: rightStepOverType,
						left: false,
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
