import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, StyleSheet, Pressable, Keyboard } from 'react-native';
import React, { useState } from 'react';
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
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';
import {
	showErrorToast,
	showSuccessToast,
} from '../../components/Toasts/Toasts';
import { toast } from '../../constants/GlobalStrings';
import { defaultFormUser } from '../../constants/baseUsers';
import { Loading } from '../../components/Loading/Loading';
import { useUpdateUser } from '../../Contexts/UserContext';
import { usePhoto } from '../../Contexts/CameraContext';
import SettingsFields from '../../components/Settings/SettingsFields';

interface FormValues {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	private_option: boolean;
	profile_picture: string;
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
		<>
			<SettingsFields
				control={control}
				setValue={setValue}
				errors={errors}
				profile_picture={profile_picture}
			/>
			<Button
				text="Sign up"
				onPress={() => {
					void handleSubmit(onSubmit)();
				}}
				disabled={isLoading || Object.keys(dirtyFields).length < 5}
				bgColor={GlobalStyles.colorPalette.primary[500]}
			/>
			{isLoading && <Loading />}
		</>
	);
};

const styles = StyleSheet.create({});

export default SignUp;
