import React, { useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Keyboard,
	Linking,
} from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import SquareTextbox from '../../components/Textbox/SquareTextbox';
import { feedback } from '../../constants/GlobalStrings';
import Header from '../../components/Header/Header';
import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { toast } from '../../constants/GlobalStrings';

interface FormValues {
	feedback: string;
}

const FeedbackPage = () => {
	const {
		control,
		handleSubmit,
		formState: { dirtyFields },
	} = useForm({
		defaultValues: {
			feedback: '',
		},
	});

	// const handleLinkPress = () => {
	// 	console.log('OPEN EMAIL DRAFT TO team@layers.com');
	// };

	const showErrorUpdateToast = () => {
		Toast.show({
			type: 'error',
			text1: toast.error,
			text2: toast.anErrorHasOccurredWhileUpdatingProfile,
			topOffset: GlobalStyles.layout.toastTopOffset,
		});
	};
	const handleEmail = (values: FormValues) => {
		const email_address = 'layersapplication@gmail.com';
		const mail = `mailto:${email_address}` + '?body=' + values.feedback;
		Linking.openURL(mail).catch((err) => {
			console.log(err);
			showErrorUpdateToast();
		});
	};

	return (
		<Pressable onPress={Keyboard.dismiss} style={styles.container}>
			<Header
				text={StackNavigation.Feedback}
				rightButton={true}
				rightBack={true}
				rightStepOverType={StepOverTypes.done}
				rightButtonAction={handleSubmit(handleEmail)}
				rightButtonDisabled={Object.keys(dirtyFields).length < 1}
			/>
			<View style={styles.content}>
				<Controller
					control={control}
					rules={{
						required: true,
						maxLength: 1000,
					}}
					render={({ field: { onChange, value } }) => (
						<SquareTextbox
							onFieldChange={onChange}
							value={value}
							placeholder={feedback.tellUsWhatYouThink}
						/>
					)}
					name="feedback"
				/>
				{/* <View style={styles.label}> */}
				{/* 	<Text style={styles.text}>{feedback.wereHappyToHelpAt}</Text> */}
				{/* 	<Pressable onPress={handleLinkPress}> */}
				{/* 		<Text style={styles.link}>{feedback.teamAtLayersDotCom}</Text> */}
				{/* 	</Pressable> */}
				{/* </View> */}
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	content: {
		marginHorizontal: GlobalStyles.layout.xGap,
		alignItems: 'center',
		gap: 15,
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
