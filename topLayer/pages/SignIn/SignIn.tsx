import React from 'react';
import { View } from 'react-native';

import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';

import InlineTextbox from '../../components/Textbox/InlineTextbox';
import Button from '../../components/Button/Button';
import GlobalStyles from '../../constants/GlobalStyles';
import { baseUrl } from '../../utils/apiUtils';

const SignIn = () => {
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

	const onSubmit = async (data: any) => {
		try {
			const response = await axios.post(`${baseUrl}/auth/login`, {
				username: data.username !== '' ? data.username : null,
				email: data.email !== '' ? data.email : null,
				password: data.password,
			});

			if (response.status === 201) {
				alert(`You have created: ${JSON.stringify(response.data)}`);
			} else {
				throw new Error('An error has occurred');
			}
		} catch (error) {
			alert(error);
		}
		console.log(data);
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
							icon={GlobalStyles.icons.userOutline}
							placeholder="Email or Username"
							value={value}
							onFieldChange={onChange}
						/>
					)}
					name={
						getValues('username').match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) !=
							null
							? 'email'
							: 'username'
					}
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
