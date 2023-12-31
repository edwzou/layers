import React, { useContext, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';

import InlineTextbox from '../../components/Textbox/InlineTextbox';
import Button from '../../components/Button/Button';
import GlobalStyles from '../../constants/GlobalStyles';
import { baseUrl } from '../../utils/apiUtils';
import { UserContext } from '../../utils/UserContext';

import Toast from 'react-native-toast-message';
import { toast } from '../../constants/GlobalStrings'

const SignIn = () => {
	const { updateData } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false); // Add loading state

	const {
		control,
		handleSubmit,
		formState: { dirtyFields },
	} = useForm({
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = (formData: any) => {
		let formValues: Record<string, string> = {};
		if (formData.username !== '') {
			formValues = {
				username: formData.username,
				password: formData.password,
			};
		} else if (formData.email !== '') {
			formValues = {
				email: formData.email,
				password: formData.password,
			};
		} else {
			throw new Error('No Username or Email');
		}

		const onSubmitInner = async (): Promise<any> => {
			setIsLoading(true); // Start loading
			try {
				const { data: userData, status } = await axios.post(
					`${baseUrl}/login`,
					formValues,
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);

				if (status === 200) {
					updateData(userData.data);
				} else {
					throw new Error(`An Sign Up Error Has Occurred: ${status}`);
				}
				setIsLoading(false); // Stop loading on success
			} catch (err: unknown) {
				setIsLoading(false); // Stop loading on error
				showErrorSignInToast()
			}
		};
		void onSubmitInner();
	};

	const showErrorSignInToast = () => {
		Toast.show({
			type: 'error',
			text1: toast.error,
			text2: toast.theEmailOrPasswordYouveEnteredIsIncorrect,
			topOffset: GlobalStyles.layout.toastTopOffset
		});
	}

	return (
		<View style={{ gap: 40, width: '100%' }}>
			<View style={{ gap: GlobalStyles.layout.gap }}>
				<Controller
					control={control}
					rules={{
						required: true,
						maxLength: 63,
					}}
					render={({ field: { onChange, value } }) => (
						<InlineTextbox
							autoCapitalize="none"
							icon={GlobalStyles.icons.userOutline}
							// placeholder="Email or Username"
							placeholder="Email"
							value={value}
							onFieldChange={onChange}
						/>
					)}
					name="email"
				/>
				<Controller
					control={control}
					rules={{
						required: true,
						maxLength: 255,
					}}
					render={({ field: { onChange, value } }) => (
						<InlineTextbox
							icon={GlobalStyles.icons.passwordOutline}
							placeholder="Password"
							value={value}
							onFieldChange={onChange}
							secure
						/>
					)}
					name="password"
				/>
			</View>
			<View style={{ alignSelf: 'center' }}>
				<Button
					text="Sign in"
					onPress={handleSubmit(onSubmit)}
					disabled={isLoading || Object.keys(dirtyFields).length < 2}
					bgColor={GlobalStyles.colorPalette.primary[500]}
				/>
			</View>

			{isLoading && (
				<View style={GlobalStyles.utils.loadingOverlay}>
					<View style={GlobalStyles.utils.loadingContainer}>
						<ActivityIndicator size='large' color={GlobalStyles.colorPalette.activityIndicator} />
					</View>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
});

export default SignIn;
