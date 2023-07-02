import React from 'react';
import { View } from 'react-native';

import { Controller, useForm } from 'react-hook-form';

import InlineTextbox from '../../components/Textbox/InlineTextbox';
import Button from '../../components/Button/Button';
import GlobalStyles from '../../constants/GlobalStyles';

const Login = () => {
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

	const onSubmit = (data: any) => {
		// Some request here
		console.log(data);
	};

	return (
		<View style={{ gap: 40, width: '100%' }}>
			<View style={{ gap: 16 }}>
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
						getValues('username').match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
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
					disabled={Object.keys(dirtyFields).length < 2 ? true : false}
				/>
			</View>
		</View>
	);
};

export default Login;
