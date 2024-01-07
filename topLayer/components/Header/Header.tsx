import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from 'utils/StackNavigation';
import { StepOverTypes } from '../../constants/Enums';

import { MainPageContext } from '../../pages/Main/MainPage';
import { headerButtons } from './HeaderButtons';

type anyFunc = (...args: any[]) => any;

interface HeaderPropType {
	text: string;
	rightBack?: boolean;
	leftBack?: boolean;
	rightButton?: boolean;
	leftButton?: boolean;
	rightStepOverType?: string;
	leftStepOverType?: string;
	rightButtonAction?: anyFunc;
	leftButtonAction?: anyFunc;
	rightButtonDisabled?: boolean;
	rightButtonNavigateTo?: number;
	leftButtonNavigateTo?: number;
}

const Header: React.FC<HeaderPropType> = ({
	text,
	rightBack,
	leftBack,
	rightButton,
	leftButton,
	rightStepOverType = StepOverTypes.rightArrow,
	leftStepOverType = StepOverTypes.leftArrow,
	rightButtonAction,
	leftButtonAction,
	rightButtonDisabled = false,
	rightButtonNavigateTo = -1,
	leftButtonNavigateTo = -1,
}: HeaderPropType) => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const { navigationArray } = useContext(MainPageContext);
	const handleRightPress = (): void => {
		if (rightButtonAction !== null && rightButtonAction !== undefined) {
			rightButtonAction();
		}
		if (rightBack === true) {
			navigation.goBack();
		}
		if (rightButtonNavigateTo !== -1) {
			navigationArray[rightButtonNavigateTo]();
		}
	};
	const handleLeftPress = (): void => {
		if (leftButtonAction !== null && leftButtonAction !== undefined) {
			leftButtonAction();
		}
		if (leftBack === true) {
			navigation.goBack();
		}
		if (leftButtonNavigateTo !== -1) {
			navigationArray[leftButtonNavigateTo]();
		}
	};
	return (
		<SafeAreaView>
			<View style={styles.header}>
				{leftButton === true &&
					headerButtons({
						type: leftStepOverType,
						left: true,
						handlePress: handleLeftPress,
						disabled: false,
					})}

				{rightButton === true &&
					headerButtons({
						type: rightStepOverType,
						left: false,
						handlePress: handleRightPress,
						disabled: rightButtonDisabled,
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
