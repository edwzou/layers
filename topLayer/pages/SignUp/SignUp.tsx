import axios from 'axios';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import GlobalStyles from '../../constants/GlobalStyles';
import { baseUrl } from '../../utils/apiUtils';
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
import { View } from 'react-native';

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

	const onSubmit = (values: FormValues): void => {
		const formValues: FormValues = {
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
		<View style={{ flex: 1 }}>
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
				style={{
					position: 'absolute',
					bottom: GlobalStyles.layout.gap * 3,
					alignSelf: 'center',
				}}
				disabled={isLoading || Object.keys(dirtyFields).length < 5}
				bgColor={GlobalStyles.colorPalette.primary[500]}
			/>

			{isLoading && <Loading />}
		</View>
	);
};

export default SignUp;
