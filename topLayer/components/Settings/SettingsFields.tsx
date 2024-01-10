import { type ReactElement } from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { StackNavigation } from '../../constants/Enums';
import { ITEM_SIZE } from '../../utils/GapCalc';
import StackedTextBox from '../../components/Textbox/StackedTextbox';
import RadioButton from '../../components/RadioButton/RadioButton';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import {
	type PrivacyOption,
	privacyOptions,
} from '../../constants/PrivateOptions';
import { settings } from '../../constants/GlobalStrings';
import {
	type Control,
	Controller,
	type UseFormSetValue,
	type FieldErrors,
} from 'react-hook-form';
import { userFieldRules } from 'constants/userConstraints';

interface SettingsFieldsType {
	control: Control<{
		first_name: string;
		last_name: string;
		email: string;
		username: string;
		password: string;
		private_option: boolean;
		profile_picture: string;
	}>;
	setValue: UseFormSetValue<{
		first_name: string;
		last_name: string;
		email: string;
		username: string;
		password: string;
		private_option: boolean;
		profile_picture: string;
	}>;
	errors: FieldErrors<{
		first_name: string;
		last_name: string;
		email: string;
		username: string;
		password: string;
		private_option: boolean;
		profile_picture: string;
	}>;
	profile_picture: string;
}

const SettingsFields = ({
	control,
	setValue,
	errors,
	profile_picture,
}: SettingsFieldsType): ReactElement => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	return (
		<View style={{ gap: 40 }}>
			<View style={styles.settingsContainer}>
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
							<ProfilePicture
								imageUrl={profile_picture}
								base64={profile_picture.slice(0, 5) !== 'https'}
							/>
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
								rules={userFieldRules.firstName}
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
								rules={userFieldRules.lastName}
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
							rules={userFieldRules.username}
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
							rules={userFieldRules.email}
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
							rules={userFieldRules.password}
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
							choice={
								control._defaultValues.private_option === true
									? privacyOptions[1].value
									: privacyOptions[0].value
							}
						/>
					</View>
					<View style={{ alignItems: 'center' }}>
						{errors.email != null && (
							<Text style={styles.error}>
								{settings.pleaseEnterAValidEmail}
							</Text>
						)}
						{errors.password != null && (
							<Text style={styles.error}>
								{settings.passwordMustBe8CharactersOrMore}
							</Text>
						)}
					</View>
				</Pressable>
			</View>
		</View>
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
	container: {
		flex: 1,
		gap: 15,
		paddingTop: 20,
	},
	settingsContainer: {
		alignItems: 'center',
		marginHorizontal: GlobalStyles.layout.xGap,
	},
});

export default SettingsFields;
