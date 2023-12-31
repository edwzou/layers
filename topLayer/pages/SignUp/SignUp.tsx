import axios, { AxiosError } from 'axios';

import { useForm, Controller } from 'react-hook-form';
import { View, Text, StyleSheet, Pressable, Keyboard, ActivityIndicator } from 'react-native';
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
import { UserContext } from '../../utils/UserContext';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';
import Toast from 'react-native-toast-message';
import { toast } from '../../constants/GlobalStrings';

interface FormValues {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	private_option: boolean;
	profile_picture: string;
}

interface PrivacyOption {
	value: string;
	boolean: boolean;
}

interface SignUpPropsType {
	pfpUrlForSignUp: string
}

const SignUp = ({ pfpUrlForSignUp }: SignUpPropsType) => {
	// const [modalVisible, setModalVisible] = useState(false);
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const { updateData } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(false); // Add loading state

	const privacyOptions = [
		{ value: 'Public', boolean: false },
		{ value: 'Private', boolean: true },
	];

	const {
		control,
		handleSubmit,
		setValue,
		formState: { dirtyFields, errors },
	} = useForm({
		defaultValues: {
			first_name: '',
			last_name: '',
			username: '',
			email: '',
			password: '',
			private_option: false,
			profile_picture: '',
		},
	});

	useEffect(() => {
		setValue('profile_picture', pfpUrlForSignUp);
		//handleFieldChange('profile_picture', pfpUrlForSettings)
	}, [pfpUrlForSignUp]);

	const onSubmit = (values: FormValues | any) => {
		const formValues: Record<string, any> = {
			first_name: values.first_name,
			last_name: values.last_name,
			username: values.username,
			email: values.email,
			password: values.password,
			profile_picture: values.profile_picture,
			private_option: values.private_option,
		};

		const onSubmitInner = async (): Promise<any> => {
			setIsLoading(true); // Start loading
			try {
				const { data: userData, status } = await axios.post(
					`${baseUrl}/signup`,
					formValues
				);

				if (status === 200) {
					updateData(userData.data);
				} else {
					throw new Error(`An Sign Up Error Has Occurred: ${status}`);
				}
				showSuccessCreateToast()
				setIsLoading(false); // Stop loading on success
			} catch (err: unknown) {
				setIsLoading(false); // Stop loading on error
				showErrorCreateToast()
				void axiosEndpointErrorHandler(err);
			}
		};
		void onSubmitInner();
	};

	const showSuccessCreateToast = () => {
		Toast.show({
			type: 'success',
			text1: toast.success,
			text2: toast.yourProfileHasBeenCreated,
			topOffset: GlobalStyles.layout.toastTopOffset,
		});
	};

	const showErrorCreateToast = () => {
		Toast.show({
			type: 'error',
			text1: toast.error,
			text2: toast.anErrorHasOccurredWhileCreatingProfile,
			topOffset: GlobalStyles.layout.toastTopOffset,
		});
	};

	return (
		<Pressable onPress={Keyboard.dismiss} style={{ gap: 40 }}>
			<View style={{ gap: GlobalStyles.layout.gap }}>
				<Pressable
					style={{ alignSelf: 'center' }}
					onPress={() => {
						navigation.navigate(StackNavigation.CameraWrapper, {
							returnToPfp: true
						});
					}}
				>
					<ProfilePicture imageUrl={pfpUrlForSignUp} base64 />
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
						maxLength: 63, // Just a random number
					}}
					render={({ field: { onChange, value } }) => (
						<StackedTextBox
							autoCapitalize="none"
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
						pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
						maxLength: 63, // Just a random number
					}}
					render={({ field: { onChange, value } }) => (
						<StackedTextBox
							autoCapitalize="none"
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
						maxLength: 255,
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
				<RadioButton privateData={privacyOptions} onSelect={(selectedOption: PrivacyOption) => {
					setValue('private_option', selectedOption.boolean);
				}} />
			</View>
			<View style={{ alignItems: 'center' }}>
				{errors.email != null && (
					<Text style={styles.error}>Please enter a valid email.</Text>
				)}
				{errors.password != null && (
					<Text style={styles.error}>
						Password must be 8 characters or more.
					</Text>
				)}
			</View>
			<View style={{ alignSelf: 'center' }}>
				<Button
					text="Sign up"
					onPress={handleSubmit(onSubmit)}
					disabled={isLoading || Object.keys(dirtyFields).length < 5}
					bgColor={GlobalStyles.colorPalette.primary[500]}
				/>
			</View>
			{isLoading && (
				<View style={GlobalStyles.utils.loadingOverlay}>
					<View style={GlobalStyles.utils.loadingContainer}>
						<ActivityIndicator
							size="large"
							color={GlobalStyles.colorPalette.activityIndicator}
						/>
					</View>
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
});

export default SignUp;
