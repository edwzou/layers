import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from 'utils/StackNavigation';
import { StepOverTypes } from '../../constants/Enums';

import { MainPageContext } from '../../pages/Main/MainPage';
import { headerButtons } from './HeaderButtons';

interface HeaderPropType {
	text: string;
	rightBack?: boolean;
	leftBack?: boolean;
	rightButton?: boolean;
	leftButton?: boolean;
	rightStepOverType?: string;
	leftStepOverType?: string;
	rightButtonAction?: any;
	leftButtonAction?: any;
	rightButtonDisabled?: boolean;
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
}: HeaderPropType) => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const { navigationArray } = useContext(MainPageContext);
	const handleRightPress = (): void => {
		if (rightButtonAction) {
			rightButtonAction();
		}
		if (rightBack) {
			navigation.goBack();
		}
		navigationArray[0]();
	};
	const handleLeftPress = (): void => {
		if (leftButtonAction) {
			leftButtonAction();
		}
		if (leftBack) {
			navigation.goBack();
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
						handlePress: handleLeftPress,
						disabled: false,
					})}

				{rightButton &&
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
