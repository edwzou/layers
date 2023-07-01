import { View, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import Header from '../../components/Header/Header';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import StackedTextbox from '../../components/Textbox/StackedTextbox';
import { itemSize } from '../../utils/GapCalc';
import Button from '../../components/Button/Button';
import RadioButton from '../../components/RadioButton/RadioButton';
import SignUp from './SignUp';

const isComplete = (fields: []) => {
	return fields.every((field) => field !== null);
};

const SignUpPage = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [privacy, setPrivacy] = useState(null);

	const fields = [firstName, lastName, username, email, password, privacy];

	// const [disableButton, setDisableButton] = useState(isComplete(fields));

	// !!! Refactor this
	const onFirstNameChange = (value: string) => {
		setFirstName(value);
	};
	const onLastNameChange = (value: string) => {
		setLastName(value);
	};
	const onUsernameChange = (value: string) => {
		setUsername(value);
	};
	const onEmailChange = (value: string) => {
		setEmail(value);
	};
	const onPasswordChange = (value: string) => {
		setPassword(value);
	};
	const onPrivacyChange = (value: boolean) => {
		// @ts-expect-error
		setPrivacy(value);
	};
	// !!! TO HERE

	const privacyOptions = [
		{ value: 'Public', boolean: false },
		{ value: 'Private', boolean: true },
	];

	return (
		<View style={styles.container}>
			<Header text="Sign up" />
			<Pressable
				onPress={() => {
					console.log('PFP Click');
				}}
			>
				<ProfilePicture />
			</Pressable>
			<SignUp />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginHorizontal: GlobalStyles.layout.xGap,
		marginTop: GlobalStyles.layout.topHeaderGap,
		gap: 40,
	},
});

export default SignUpPage;
