import { Controller } from 'react-hook-form';
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Keyboard,
	ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import StackedTextBox from '../../components/Textbox/StackedTextbox';
import { ITEM_SIZE } from '../../utils/GapCalc';
import RadioButton from '../../components/RadioButton/RadioButton';
import GlobalStyles from '../../constants/GlobalStyles';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { StackNavigation } from '../../constants/Enums';
import { settings } from '../../constants/GlobalStrings';
import { SettingsPageContext } from './SettingsPage';
import { ProfilePageContext } from './ProfilePage';

interface FormValues {
	first_name: string;
	last_name: string;
	email: string;
	username: string;
	password: string;
	private_option: boolean;
	profile_picture: string;
}

interface PrivacyOption {
	value: string;
	boolean: boolean;
}

const Settings = () => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const {
		control,
		setValue,
		setFormData,
		errors,
		showSuccessUpdate,
		setShowSuccessUpdate,
		isLoading,
	} = useContext(SettingsPageContext);

	const {
		pfpUrlForSettings,
		setReturnToPfp
	} = useContext(ProfilePageContext);

	// Update the state object when form fields change
	const handleFieldChange = (fieldName: string, value: string | boolean) => {
		setFormData((prevData: FormValues) => ({
			...prevData,
			[fieldName]: value,
		}));
	};

	useEffect(() => {
		setValue('profile_picture', pfpUrlForSettings);
		handleFieldChange('profile_picture', pfpUrlForSettings)
	}, [pfpUrlForSettings]);

	useEffect(() => {
		if (showSuccessUpdate) {
			navigation.goBack();
			setShowSuccessUpdate(false);
		}
	}, [showSuccessUpdate]);

	const privacyOptions: PrivacyOption[] = [
		{ value: 'Public', boolean: false },
		{ value: 'Private', boolean: true },
	];

	return (
		<Pressable onPress={Keyboard.dismiss} style={{ gap: 40 }}>
			<View style={{ gap: GlobalStyles.layout.gap }}>
				<Pressable
					style={{ alignSelf: 'center' }}
					onPress={() => {
						setReturnToPfp(true);
						navigation.navigate(StackNavigation.CameraWrapper, {
							returnToPfp: true,
						});
					}}
				>
					<ProfilePicture imageUrl={pfpUrlForSettings} base64={pfpUrlForSettings.slice(0, 5) == 'https' ? false : true} />
				</Pressable>
				<View
					style={{
						flexDirection: 'row',
						gap: GlobalStyles.layout.gap,
						width: ITEM_SIZE(),
					}}
				>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, value } }) => (
							<StackedTextBox
								label="First Name"
								onFieldChange={(newValue) => {
									onChange(newValue);
									handleFieldChange('first_name', newValue);
								}}
								value={value.trim()}
							/>
						)}
						name="first_name"
					/>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, value } }) => (
							<StackedTextBox
								label="Last Name"
								onFieldChange={(newValue) => {
									onChange(newValue);
									handleFieldChange('last_name', newValue);
								}}
								value={value.trim()}
							/>
						)}
						name="last_name"
					/>
				</View>
				<Controller
					control={control}
					rules={{
						required: true,
						maxLength: 20, // Just a random number
					}}
					render={({ field: { onChange, value } }) => (
						<StackedTextBox
							label="Username"
							onFieldChange={(newValue) => {
								onChange(newValue);
								handleFieldChange('username', newValue);
							}}
							value={value.trim()}
						/>
					)}
					name="username"
				/>
				<Controller
					control={control}
					rules={{
						required: true,
						pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
					}}
					render={({ field: { onChange, value } }) => (
						<StackedTextBox
							label="Email"
							onFieldChange={(newValue) => {
								onChange(newValue);
								handleFieldChange('email', newValue);
							}}
							value={value.trim()}
						/>
					)}
					name="email"
				/>
				<Controller
					control={control}
					rules={{
						required: true,
						minLength: 8,
						maxLength: 255,
					}}
					render={({ field: { onChange, value } }) => (
						<StackedTextBox
							label="Password"
							onFieldChange={(newValue) => {
								onChange(newValue);
								handleFieldChange('password', newValue);
							}}
							value={value}
							secure
						/>
					)}
					name="password"
				/>
				<RadioButton
					privateData={privacyOptions}
					onSelect={(selectedOption: PrivacyOption) => {
						setValue('private_option', selectedOption.boolean);
						handleFieldChange('private_option', selectedOption.boolean);
					}}
				/>
			</View>
			<View style={{ alignItems: 'center' }}>
				{errors.email != null && (
					<Text style={styles.error}>{settings.pleaseEnterAValidEmail}</Text>
				)}
				{errors.password != null && (
					<Text style={styles.error}>
						{settings.passwordMustBe8CharactersOrMore}
					</Text>
				)}
			</View>

			{isLoading && (
				<View style={styles.overlay}>
					<ActivityIndicator
						size="large"
						color={GlobalStyles.colorPalette.activityIndicator}
					/>
				</View>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	error: {
		color: GlobalStyles.colorPalette.danger[500],
	},
	camera: {
		flex: 1,
	},
	modalGroup: {
		backgroundColor: GlobalStyles.colorPalette.primary[100],
		borderRadius: GlobalStyles.utils.smallRadius.borderRadius,
		gap: 5,
		width: '95%',
	},
	modalSelection: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
	},
	modalButtons: {
		width: '95%',
		alignItems: 'center',
		backgroundColor: GlobalStyles.colorPalette.primary[100],
		borderRadius: GlobalStyles.utils.smallRadius.borderRadius,
		padding: 15,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'transparent', // Set to transparent
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default React.memo(Settings);
