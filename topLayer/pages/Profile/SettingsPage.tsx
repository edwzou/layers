import { View, StyleSheet } from 'react-native';
import React, {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import Header from '../../components/Header/Header';
import Settings from './Settings';
import {
	NavigationBack,
	StackNavigation,
	StepOverTypes,
} from '../../constants/Enums';
import {
	Control,
	FieldErrors,
	UseFormHandleSubmit,
	UseFormSetValue,
	useForm,
} from 'react-hook-form';
import { AppContext } from '../../AppControl/AppHome';
import { UserContext } from '../../utils/UserContext';
import { type User } from '../Main/UserTypes';
import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';
import { toast } from '../../constants/GlobalStrings';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';
import {
	showErrorToast,
	showSuccessToast,
} from '../../components/Toasts/Toasts';

interface FormValues {
	first_name: string;
	last_name: string;
	email: string;
	username: string;
	password: string;
	private_option: boolean;
	profile_picture: string;
}

// Define the context type
type SettingsPageContextType = {
	control: Control<FormValues>;
	setValue: UseFormSetValue<FormValues>;
	errors: FieldErrors<FormValues>;
	showSuccessUpdate: boolean;
	setShowSuccessUpdate: Dispatch<SetStateAction<boolean>>;
	isLoading: boolean;
};

// Create the context with the defined type
export const SettingsPageContext = createContext<SettingsPageContextType>({
	control: {} as Control<FormValues>,
	setValue: {} as UseFormSetValue<FormValues>,
	errors: {} as FieldErrors<FormValues>,
	showSuccessUpdate: false,
	setShowSuccessUpdate: () => {},
	isLoading: false,
});

const SettingsPage: React.FC = () => {
	const { setShouldRefreshApp } = useContext(AppContext);

	const { data, updateData } = useContext(UserContext);

	const { first_name, last_name, email, username, private_option, pp_url } =
		data as User;

	const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);
	const [isLoading, setIsLoading] = useState(false); // Add loading state

	const defaultForm = {
		first_name: first_name,
		last_name: last_name,
		email: email,
		username: username,
		password: '**********',
		private_option: private_option,
		profile_picture: pp_url,
	};

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: defaultForm,
	});

	const handleLogout = async (): Promise<void> => {
		await axios(`${baseUrl}/logout`);
		updateData(null);
	};

	const onSubmit = async (formValues: FormValues | any): Promise<void> => {
		console.log('values: ', formValues.first_name, formValues.last_name);
		if (data === null || data === undefined) {
			console.log('User data is not available.');
			return;
		}

		const updatedFields: Partial<FormValues> = {};

		if (formValues.first_name !== data.first_name) {
			updatedFields.first_name = formValues.first_name;
		}
		if (formValues.last_name !== data.last_name) {
			updatedFields.last_name = formValues.last_name;
		}
		if (formValues.email !== data.email) {
			updatedFields.email = formValues.email;
		}
		if (formValues.username !== data.username) {
			updatedFields.username = formValues.username;
		}
		if (formValues.password !== '**********') {
			updatedFields.password = formValues.password;
		}
		if (formValues.private_option !== data.private_option) {
			updatedFields.private_option = formValues.private_option;
		}
		if (formValues.profile_picture !== data.pp_url) {
			updatedFields.profile_picture = formValues.profile_picture;
		}

		if (Object.keys(updatedFields).length === 0) {
			console.log('No changes to update');
			return;
		}

		setIsLoading(true); // Start loading

		try {
			const response = await axios.put(
				`${baseUrl}/api/private/users`,
				updatedFields,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.status === 200) {
				try {
					// Causes a huge mess. Look into later. Just refresh and re-fetch for now.
					// const sessionData = JSON.stringify(response.data.data);
					// await AsyncStorage.setItem('session', sessionData);
					// updateData(sessionData);
					setShowSuccessUpdate(true);
					setShouldRefreshApp(true);
					showSuccessToast(toast.yourProfileHasBeenUpdated);
					setIsLoading(false); // Stop loading on success
				} catch (error) {
					setIsLoading(false); // Stop loading on error
					console.log(error);
					showErrorToast(toast.anErrorHasOccurredWhileUpdatingProfile);
				}
			} else {
				throw new Error('An error has occurred');
			}
		} catch (error) {
			axiosEndpointErrorHandler(error);
		}
	};

	return (
		<SettingsPageContext.Provider
			value={{
				control,
				setValue,
				errors,
				showSuccessUpdate,
				setShowSuccessUpdate,
				isLoading,
			}}
		>
			<View style={styles.container}>
				<Header
					text={StackNavigation.Settings}
					leftButton={true}
					leftStepOverType={StepOverTypes.logout}
					leftButtonAction={handleLogout}
					rightButton={true}
					rightStepOverType={StepOverTypes.update}
					rightButtonAction={() => {
						void handleSubmit(onSubmit)();
					}}
				/>
				<View style={{ gap: 40 }}>
					<View style={styles.settingsContainer}>
						<Settings />
					</View>
				</View>
			</View>
		</SettingsPageContext.Provider>
	);
};

const styles = StyleSheet.create({
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

export default SettingsPage;
