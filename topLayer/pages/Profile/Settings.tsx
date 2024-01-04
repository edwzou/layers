import { Controller } from 'react-hook-form';
import { View, Text, StyleSheet, Pressable, Keyboard } from 'react-native';
import React, { useContext, useEffect } from 'react';
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
import {
	type PrivacyOption,
	privacyOptions,
} from '../../constants/PrivateOptions';
import { Loading } from '../../components/Loading/Loading';
import { usePhoto } from '../../Contexts/CameraContext';

const Settings: React.FC = () => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const {
		control,
		setValue,
		errors,
		showSuccessUpdate,
		setShowSuccessUpdate,
		isLoading,
	} = useContext(SettingsPageContext);

	const profile_picture = usePhoto();

	useEffect(() => {
		setValue('profile_picture', profile_picture);
	}, [profile_picture]);

	useEffect(() => {
		if (showSuccessUpdate) {
			navigation.goBack();
			setShowSuccessUpdate(false);
		}
	}, [showSuccessUpdate]);

	return (
		<Pressable onPress={Keyboard.dismiss} style={{ gap: 40 }}>
			<View style={{ gap: GlobalStyles.layout.gap }}>
				<Pressable
					style={{ alignSelf: 'center' }}
					onPress={() => {
						navigation.navigate(StackNavigation.CameraWrapper, {
							returnToPfp: true,
						});
					}}
				>
					<ProfilePicture
						imageUrl={profile_picture}
						base64={profile_picture.slice(0, 5) !== 'https'}
					/>
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
							maxLength: 50,
						}}
						render={({ field: { onChange, value } }) => (
							<StackedTextBox
								label="First Name"
								onFieldChange={onChange}
								value={value.trim()}
							/>
						)}
						name="first_name"
					/>
					<Controller
						control={control}
						rules={{
							required: true,
							maxLength: 50,
						}}
						render={({ field: { onChange, value } }) => (
							<StackedTextBox
								label="Last Name"
								onFieldChange={onChange}
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
						maxLength: 20,
					}}
					render={({ field: { onChange, value } }) => (
						<StackedTextBox
							label="Username"
							onFieldChange={onChange}
							value={value.trim()}
						/>
					)}
					name="username"
				/>
				<Controller
					control={control}
					rules={{
						required: true,
						pattern: /^\S+@\S+\.\S+$/,
						maxLength: 255,
					}}
					render={({ field: { onChange, value } }) => (
						<StackedTextBox
							label="Email"
							onFieldChange={onChange}
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
						maxLength: 100,
					}}
					render={({ field: { onChange, value } }) => (
						<StackedTextBox
							label="Password"
							onFieldChange={onChange}
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
					}}
					choice={
						control._defaultValues.private_option === true
							? privacyOptions[1].value
							: privacyOptions[0].value
					}
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

			{isLoading && <Loading />}
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
});

export default React.memo(Settings);
