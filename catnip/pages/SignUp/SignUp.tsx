import { useForm, Controller } from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import StackedTextBox from '../../components/Textbox/StackedTextbox';
import Button from '../../components/Button/Button';
import { itemSize } from '../../utils/GapCalc';
import RadioButton from '../../components/RadioButton/RadioButton';
import GlobalStyles from '../../constants/GlobalStyles';

const SignUp = () => {
	const {
		control,
		handleSubmit,
		setValue,
		formState: { dirtyFields, errors },
	} = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			privacy: false,
		},
	});

	const onSubmit = (data: any) => {
		// Some request here
		console.log(data);
	};
	const privacyOptions = [
		{ value: 'Public', boolean: false },
		{ value: 'Private', boolean: true },
	];

	return (
		<View style={{ gap: 40 }}>
			<View style={{ gap: 16 }}>
				<View
					style={{
						flexDirection: 'row',
						gap: 16,
						width: itemSize,
					}}
				>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, value } }) => (
							<StackedTextBox
								label="First Name"
								onFieldChange={onChange}
								value={value}
							/>
						)}
						name="firstName"
					/>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, value } }) => (
							<StackedTextBox
								label="Last Name"
								onFieldChange={onChange}
								value={value}
							/>
						)}
						name="lastName"
					/>
				</View>
				<Controller
					control={control}
					rules={{
						required: true,
						maxLength: 20, // Just a random number
					}}
					render={({ field: { onChange, value } }) => (
						<StackedTextBox
							label="Username"
							onFieldChange={onChange}
							value={value}
						/>
					)}
					name="username"
				/>
				<Controller
					control={control}
					rules={{
						required: true,
						pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
					}}
					render={({ field: { onChange, value } }) => (
						<StackedTextBox
							label="Email"
							onFieldChange={onChange}
							value={value}
						/>
					)}
					name="email"
				/>
				<Controller
					control={control}
					rules={{
						required: true,
						minLength: 5,
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
				<RadioButton data={privacyOptions} onSelect={setValue} />
			</View>
			<View style={{ alignItems: 'center' }}>
				{errors.email && (
					<Text style={styles.error}>Please enter a valid email.</Text>
				)}
				{errors.password && (
					<Text style={styles.error}>
						Password must be 5 characters or more.
					</Text>
				)}
			</View>
			<View style={{ alignSelf: 'center' }}>
				<Button
					text="Sign up"
					onPress={handleSubmit(onSubmit)}
					disabled={Object.keys(dirtyFields).length < 5 ? true : false}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	error: {
		color: GlobalStyles.colorPalette.danger[500],
	},
});

export default SignUp;
