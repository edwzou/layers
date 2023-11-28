import React, { useContext } from 'react';
import { View } from 'react-native';

import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';

import InlineTextbox from '../../components/Textbox/InlineTextbox';
import Button from '../../components/Button/Button';
import GlobalStyles from '../../constants/GlobalStyles';
import { baseUrl } from '../../utils/apiUtils';
import { UserContext } from '../../utils/UserContext';

const SignIn = () => {
	const { updateData } = useContext(UserContext);
	const {
		control,
		handleSubmit,
		getValues,
		formState: { dirtyFields },
	} = useForm({
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = (formData: any) => {
		console.log('Button Pressed');
		console.log('data: ', formData);
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
		console.log('values: ', formValues);

		const onSubmitInner = async (): Promise<any> => {
			try {
				const { status } = await axios.post(`${baseUrl}/login`, formValues, {
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (status === 200) {
					const { data: userData, status } = await axios.get(
						`${baseUrl}/api/private/users`
					);

					if (status === 200) {
						updateData(userData.data);
					}
				} else {
					throw new Error('An error has occurred');
				}
			} catch (error) {
				alert(error);
			}
		};
		void onSubmitInner();
	};

	return (
		<View style={{ gap: 40, width: '100%' }}>
			<View style={{ gap: GlobalStyles.layout.gap }}>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, value } }) => (
						<InlineTextbox
							autoCapitalize="none"
							icon={GlobalStyles.icons.userOutline}
							placeholder="Email or Username"
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
					disabled={Object.keys(dirtyFields).length < 2}
					bgColor={GlobalStyles.colorPalette.primary[500]}
				/>
			</View>
		</View>
	);
};

export default SignIn;
