import { useState, type ReactElement } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Keyboard,
	Alert,
} from 'react-native';
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
import { settings, toast } from '../../constants/GlobalStrings';
import {
	type Control,
	Controller,
	type UseFormSetValue,
	type FieldErrors,
} from 'react-hook-form';
import Icon from 'react-native-remix-icon';
import { Loading } from '../Loading/Loading';
import axios from 'axios';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';
import { baseUrl } from '../../utils/apiUtils';
import { showErrorToast, showSuccessToast } from '../Toasts/Toasts';

interface SettingsFieldsType {
	control: Control<{
		uid: string;
		first_name: string;
		last_name: string;
		email: string;
		username: string;
		password: string;
		private_option: boolean;
		profile_picture: string;
	}>;
	setValue: UseFormSetValue<{
		uid: string;
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
	uid: string;
	profile_picture: string;
}

const SettingsFields = ({
	control,
	setValue,
	errors,
	uid,
	profile_picture,
}: SettingsFieldsType): ReactElement => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();

	const [isLoading, setIsLoading] = useState(false);

	const confirmDeletion = (): void => {
		Alert.alert(settings.deleteAccount, settings.youCannotUndoThisAction, [
			{
				text: settings.cancel,
				onPress: () => {},
			},
			{
				text: settings.delete,
				onPress: () => {
					void handleDelete();
				},
				style: 'destructive',
			},
		]);
	};

	const handleDelete = async (): Promise<void> => {
		setIsLoading(true);
		try {
			console.log('uid:', uid);
			// Use Promise.all to send multiple requests simultaneously
			// const [
			// 	deleteOutfitsResponse,
			// 	deleteClothingItemsResponse,
			// 	deleteUserResponse,
			// ] = await Promise.all([
			// 	// this may not work because there might be an order for deletion
			// 	axios.delete(`${baseUrl}/api/private/outfits/all`),
			// 	axios.delete(`${baseUrl}/api/private/clothing_items/all`),
			// 	axios.delete(`${baseUrl}/api/private/users`),
			// ]);
			const deleteOutfitsResponse = await axios.delete(
				// just testing out outfits first
				`${baseUrl}/api/private/outfits/`
			);
			const deleteClothingItemsResponse = await axios.delete(
				// clothing items after
				`${baseUrl}/api/private/clothing_items/`
			);

			// Check the HTTP status codes for each response
			if (
				deleteOutfitsResponse.status === 200 &&
				deleteClothingItemsResponse.status === 200
			) {
				// All requests were successful
				// setShouldRefreshMainPage(true); // need to figure out what happens after the account has been deleted
				// navigateToProfile();
				showSuccessToast(toast.yourProfileHasBeenDeleted);
			} else {
				// At least one of the requests failed
				showErrorToast(toast.anErrorHasOccurredWhileDeletingProfile);
			}

			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			axiosEndpointErrorHandler(error);
		}
	};

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
								rules={{
									required: true,
									maxLength: 50,
								}}
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
								rules={{
									required: true,
									maxLength: 50,
								}}
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
							rules={{
								required: true,
								maxLength: 20,
							}}
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
							rules={{
								required: true,
								pattern: /^\S+@\S+\.\S+$/,
								maxLength: 255,
							}}
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
							rules={{
								required: true,
								minLength: 8,
								maxLength: 100,
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
				<View style={styles.deleteButtonContainer}>
					<Pressable onPress={confirmDeletion}>
						<View style={GlobalStyles.utils.deleteButton}>
							<Icon
								name={GlobalStyles.icons.closeOutline}
								color={GlobalStyles.colorPalette.background}
								size={GlobalStyles.sizing.icon.regular}
							/>
						</View>
					</Pressable>
				</View>

				{isLoading && <Loading />}
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
	deleteButtonContainer: {
		position: 'absolute',
		bottom: 0,
		alignSelf: 'center',
	},
});

export default SettingsFields;
