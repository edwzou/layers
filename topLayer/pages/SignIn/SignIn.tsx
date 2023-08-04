import React from 'react';
import { View } from 'react-native';

import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';

import InlineTextbox from '../../components/Textbox/InlineTextbox';
import Button from '../../components/Button/Button';
import GlobalStyles from '../../constants/GlobalStyles';
import { baseUrl } from '../../utils/apiUtils';
import { useAuth0, Auth0Provider } from 'react-native-auth0';

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

	const { authorize, user } = useAuth0();

	const onSubmit = async (data: any) => {
		try {
			const response = await axios.post(`${baseUrl}/api/auth/login`, {
				username: data.username !== '' ? data.username : null,
				email: data.email !== '' ? data.email : null,
				password: data.password,
			}, {
				headers: {
					"Content-Type": 'Multipart/form-data'
				}
			});
			// await authorize({ scope: 'openid profile email' }, { customScheme: 'com.authenticate.Layers' });

			if (user) {
				console.log(user)
			}
			if (response.status === 200) {
				alert(`Logged In ${JSON.stringify(response.data)}`);
			} else {
				throw new Error(response.statusText);
			}

		} catch (error) {
			alert(error);
		}
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
