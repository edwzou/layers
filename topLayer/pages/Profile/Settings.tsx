import axios from 'axios';

import { useForm, Controller } from 'react-hook-form';
import { View, Text, StyleSheet, Pressable, Keyboard } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import StackedTextBox from '../../components/Textbox/StackedTextbox';
import Button from '../../components/Button/Button';
import { ITEM_SIZE } from '../../utils/GapCalc';
import RadioButton from '../../components/RadioButton/RadioButton';
import GlobalStyles from '../../constants/GlobalStyles';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';

import * as ImagePicker from 'expo-image-picker';
import { base64Prefix } from '../../utils/Base64Prefix';
import { baseUrl } from '../../utils/apiUtils';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { StackNavigation } from '../../constants/Enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../utils/UserContext';
import { User } from '../../pages/Main';
import { ProfilePageContext } from './ProfilePage';

interface FormValues {
	first_name: string,
	last_name: string,
	email: string,
	username: string,
	password: string,
	private_option: boolean,
	pp_url: string,
}

interface PrivacyOption {
	value: string;
	boolean: boolean;
}

const Settings = () => {
	const [image, setImage] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const { data, updateData } = useContext(UserContext);
	const { control, handleSubmit, setValue, setFormData, pp_url, errors } = useContext(ProfilePageContext);

	const handleLogout = async () => {
		await axios(`${baseUrl}/logout`);
		updateData(null);
	};

	useEffect(() => {
		setValue('pp_url', image);
	}, [image]);

	const privacyOptions: PrivacyOption[] = [
		{ value: 'Public', boolean: false },
		{ value: 'Private', boolean: true },
	];

	// Update the state object when form fields change
	const handleFieldChange = (fieldName: string, value: string | boolean) => {
		setFormData((prevData: FormValues) => ({
			...prevData,
			[fieldName]: value,
		}));
	};

	return (
		<Pressable onPress={Keyboard.dismiss} style={{ gap: 40 }}>
			<View style={{ gap: GlobalStyles.layout.gap }}>
				<Pressable
					style={{ alignSelf: 'center' }}
					onPress={() => {
						navigation.navigate(StackNavigation.Camera, {
							setImage: setImage,
						});
					}}
				>
					<ProfilePicture imageUrl={pp_url} />
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
						minLength: 5,
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
				<Button
					onPress={handleLogout}
					text={'Sign out'}
					bgColor={GlobalStyles.colorPalette.primary[500]}
				/>
			</View>
			<View style={{ alignItems: 'center' }}>
				{errors.email != null && (
					<Text style={styles.error}>Please enter a valid email.</Text>
				)}
				{errors.password != null && (
					<Text style={styles.error}>
						Password must be 5 characters or more.
					</Text>
				)}
			</View>
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
