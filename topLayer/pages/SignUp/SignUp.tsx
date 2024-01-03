import axios from 'axios';

import { useForm, Controller } from 'react-hook-form';
import { View, Text, StyleSheet, Pressable, Keyboard } from 'react-native';
import React, { type ReactElement, useEffect, useState } from 'react';
import StackedTextBox from '../../components/Textbox/StackedTextbox';
import Button from '../../components/Button/Button';
import { ITEM_SIZE } from '../../utils/GapCalc';
import RadioButton from '../../components/RadioButton/RadioButton';
import GlobalStyles from '../../constants/GlobalStyles';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import { baseUrl } from '../../utils/apiUtils';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { StackNavigation } from '../../constants/Enums';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';
import {
	showErrorToast,
	showSuccessToast,
} from '../../components/Toasts/Toasts';
import { toast } from '../../constants/GlobalStrings';
import {
	type PrivacyOption,
	privacyOptions,
} from '../../constants/PrivateOptions';
import { defaultFormUser } from '../../constants/baseUsers';
import { Loading } from '../../components/Loading/Loading';
import { useUpdateUser } from '../../Contexts/UserContext';
import { usePhoto } from '../../Contexts/CameraContext';

interface FormValues {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	private_option: boolean;
	profile_picture: string;
}

interface SignUpPropsType {
	pfpUrlForSignUp: string;
}

const SignUp: React.FC = () => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const updateUser = useUpdateUser();
	const profile_picture = usePhoto();

	const [isLoading, setIsLoading] = useState(false); // Add loading state

	const {
		control,
		handleSubmit,
		setValue,
		formState: { dirtyFields, errors },
	} = useForm({
		defaultValues: defaultFormUser,
	});

	const onSubmit = (values: FormValues | any): void => {
		const formValues: Record<string, any> = {
			first_name: values.first_name,
			last_name: values.last_name,
			username: values.username,
			email: values.email,
			password: values.password,
			profile_picture: profile_picture,
			private_option: values.private_option,
		};

		const onSubmitInner = async (): Promise<void> => {
			setIsLoading(true); // Start loading
			try {
				const { data: userData, status } = await axios.post(
					`${baseUrl}/signup`,
					formValues
				);

				if (status === 200) {
					updateUser({
						type: 'change user',
						user: userData.data,
					});
				} else {
					throw new Error(`An Sign Up Error Has Occurred: ${status}`);
				}

				showSuccessToast(toast.yourProfileHasBeenCreated);
				setIsLoading(false); // Stop loading on success
			} catch (err: unknown) {
				setIsLoading(false); // Stop loading on error
				showErrorToast(toast.anErrorHasOccurredWhileCreatingProfile);
				axiosEndpointErrorHandler(err);
			}
		};
		void onSubmitInner();
	};

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
					<ProfilePicture imageUrl={profile_picture} base64 />
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
						pattern: /^\S+@\S+\.\S+$/,
						maxLength: 255,
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
					choice={privacyOptions[0].value}
				/>
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
					onPress={() => {
						void handleSubmit(onSubmit)();
					}}
					disabled={isLoading || Object.keys(dirtyFields).length < 5}
					bgColor={GlobalStyles.colorPalette.primary[500]}
				/>
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

export default SignUp;
