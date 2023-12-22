import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import SquareTextbox from '../../components/Textbox/SquareTextbox';
import { feedback } from '../../constants/GlobalStrings';
import Header from '../../components/Header/Header';
import { StackNavigation, StepOverTypes } from '../../constants/Enums';

const FeedbackPage = () => {
	const handleLinkPress = () => {
		console.log('OPEN EMAIL DRAFT TO team@layers.com');
	};

	return (
		<View style={styles.container}>
			<Header
				text={StackNavigation.Feedback}
				rightButton={true}
				rightStepOverType={StepOverTypes.update}
			/>
			<View style={styles.content}>
				<SquareTextbox placeholder={feedback.tellUsWhatYouThink} />
				<View style={styles.label}>
					<Text style={styles.text}>{feedback.wereHappyToHelpAt}</Text>
					<Pressable onPress={handleLinkPress}>
						<Text style={styles.link}>{feedback.teamAtLayersDotCom}</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	content: {
		marginHorizontal: GlobalStyles.layout.xGap,
		alignItems: 'center',
		gap: 15,
		// flex: 1,
	},
	container: {
		flex: 1,
		gap: 15,
		paddingTop: 20,
	},
	label: {
		flexDirection: 'row',
		gap: 4,
	},
	text: {
		...GlobalStyles.typography.body2,
		color: GlobalStyles.colorPalette.primary[900],
	},
	link: {
		...GlobalStyles.typography.body2,
		color: GlobalStyles.colorPalette.info[500],
	},
});

export default FeedbackPage;
