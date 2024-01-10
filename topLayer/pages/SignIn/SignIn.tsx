import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Button from '../../components/Button/Button';
import GlobalStyles from '../../constants/GlobalStyles';
import { baseUrl } from '../../utils/apiUtils';
import { toast } from '../../constants/GlobalStrings';
import { showErrorToast } from '../../components/Toasts/Toasts';
import { Loading } from '../../components/Loading/Loading';
import { useUpdateUser } from '../../Contexts/UserContext';
import LoginFields from '../../components/Settings/LogInFields';

const SignIn: React.FC = () => {
	const updateUser = useUpdateUser();
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

	const onSubmit = (formData: any): void => {
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
					updateUser({
						type: 'change user',
						user: userData.data,
					});
				} else {
					throw new Error(`An Sign Up Error Has Occurred: ${status}`);
				}
				setIsLoading(false); // Stop loading on success
			} catch (err: unknown) {
				setIsLoading(false); // Stop loading on error
				showErrorToast(toast.theEmailOrPasswordYouveEnteredIsIncorrect);
			}
		};
		void onSubmitInner();
	};

	return (
		<View style={{ gap: 40, width: '100%' }}>
			<LoginFields control={control} />
			<View style={{ alignSelf: 'center' }}>
				<Button
					text="Sign in"
					onPress={() => {
						void handleSubmit(onSubmit)();
					}}
					disabled={isLoading || Object.keys(dirtyFields).length < 2}
					bgColor={GlobalStyles.colorPalette.primary[500]}
				/>
			</View>

			{isLoading && <Loading />}
		</View>
	);
};

const styles = StyleSheet.create({});

export default SignIn;
