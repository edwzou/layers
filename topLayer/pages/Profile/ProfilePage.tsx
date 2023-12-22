import React, {
	useState,
	useContext,
	createContext,
	Dispatch,
	SetStateAction,
} from 'react';

import { StackNavigation, StepOverTypes } from '../../constants/Enums';
import { Stack } from '../../utils/StackNavigation';

import Profile from './Profile';
import FeedbackPage from '../Feedback/FeedbackPage';
import SettingsPage from './SettingsPage';
import ItemViewPage from '../../pages/ItemView/ItemViewPage';
import OutfitViewPage from '../../pages/OutfitView/OutfitViewPage';
import { headerButton } from '../../components/Modal/HeaderButton';
import { NavigationContainer } from '@react-navigation/native';
import GlobalStyles from '../../constants/GlobalStyles';
import { UserContext } from '../../utils/UserContext';
import {
	FieldErrors,
	UseFormHandleSubmit,
	UseFormSetValue,
	useForm,
} from 'react-hook-form';
import { User } from '../../pages/Main';

import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';
import { Control } from 'react-hook-form';
import { AppContext } from '../../App';
import CameraWrapper from '../../components/Camera/CameraWrapper';

import Toast from 'react-native-toast-message';
import { toast } from '../../constants/GlobalStrings';

interface FormValues {
	first_name: string;
	last_name: string;
	email: string;
	username: string;
	password: string;
	private_option: boolean;
	pp_url: string;
}

// Define the context type
type ProfilePageContextType = {
	control: Control<FormValues>;
	handleSubmit: UseFormHandleSubmit<FormValues>;
	setValue: UseFormSetValue<FormValues>;
	setFormData: Dispatch<SetStateAction<FormValues>>;
	pp_url: string;
	errors: FieldErrors<FormValues>;
	showSuccessUpdate: boolean;
	setShowSuccessUpdate: Dispatch<SetStateAction<boolean>>;
	isLoading: boolean;
};

// Create the context with the defined type
export const ProfilePageContext = createContext<ProfilePageContextType>({
	control: {} as Control<FormValues>,
	handleSubmit: {} as UseFormHandleSubmit<FormValues>,
	setValue: {} as UseFormSetValue<FormValues>,
	setFormData: () => {},
	pp_url: '',
	errors: {} as FieldErrors<FormValues>,
	showSuccessUpdate: false,
	setShowSuccessUpdate: () => {},
	isLoading: false,
});

const ProfilePage = () => {
	const { setShouldRefreshProfilePage } = useContext(AppContext);

	const { data, updateData } = useContext(UserContext);

	const { first_name, last_name, email, username, private_option, pp_url } =
		data as User;

	const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);
	const [isLoading, setIsLoading] = useState(false); // Add loading state

	const [formData, setFormData] = useState<FormValues>({
		first_name: first_name,
		last_name: last_name,
		email: email,
		username: username,
		password: '**********',
		private_option: private_option,
		pp_url: pp_url,
	});

	const {
		control,
		handleSubmit,
		setValue,
		formState: { dirtyFields, errors },
	} = useForm({
		defaultValues: formData,
	});

	const handleLogout = async () => {
		await axios(`${baseUrl}/logout`);
		updateData(null);
	};

	const onSubmit = async (formValues: FormValues | any) => {
		if (!data) {
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
		if (formValues.pp_url !== data.pp_url) {
			updatedFields.pp_url = formValues.pp_url;
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
					setShouldRefreshProfilePage(true);
					showSuccessUpdateToast();
					setIsLoading(false); // Stop loading on success
				} catch (error) {
					setIsLoading(false); // Stop loading on error
					console.log(error);
					showErrorUpdateToast();
				}
			} else {
				throw new Error('An error has occurred');
			}
		} catch (error) {
			alert(error);
		}
	};

	const showSuccessUpdateToast = () => {
		Toast.show({
			type: 'success',
			text1: toast.success,
			text2: toast.yourProfileHasBeenUpdated,
			topOffset: GlobalStyles.layout.toastTopOffset,
		});
	};

	const showErrorUpdateToast = () => {
		Toast.show({
			type: 'error',
			text1: toast.error,
			text2: toast.anErrorHasOccurredWhileUpdatingProfile,
			topOffset: GlobalStyles.layout.toastTopOffset,
		});
	};

	return (
		<ProfilePageContext.Provider
			value={{
				control,
				handleSubmit,
				setValue,
				setFormData,
				pp_url,
				errors,
				showSuccessUpdate,
				setShowSuccessUpdate,
				isLoading,
			}}
		>
			<NavigationContainer independent={true}>
				<Stack.Navigator>
					<Stack.Screen
						options={{
							headerShown: false,
						}}
						name={StackNavigation.Profile}
						component={Profile}
					/>
					<Stack.Group
						screenOptions={{
							presentation: 'modal',
							headerTitleStyle: GlobalStyles.typography.subtitle,
							headerStyle: {
								backgroundColor: GlobalStyles.colorPalette.background,
							},
							headerShadowVisible: false,
						}}
					>
						<Stack.Screen
							name={StackNavigation.Feedback}
							component={FeedbackPage}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name={StackNavigation.Settings}
							component={SettingsPage}
							options={{
								headerLeft: () =>
									headerButton({
										type: StepOverTypes.logout,
										handlePress: handleLogout,
									}),
								headerRight: () =>
									headerButton({
										type: StepOverTypes.update,
										handlePress: handleSubmit(() => onSubmit(formData)),
									}),
							}}
						/>
						<Stack.Screen
							name={StackNavigation.ItemView}
							component={ItemViewPage}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name={StackNavigation.OutfitView}
							component={OutfitViewPage}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name={StackNavigation.CameraWrapper}
							component={CameraWrapper}
							options={{
								presentation: 'fullScreenModal',
								animation: 'slide_from_bottom',
								gestureEnabled: true,
								gestureDirection: 'vertical',
								headerShown: false,
							}}
						/>
					</Stack.Group>
				</Stack.Navigator>
			</NavigationContainer>
		</ProfilePageContext.Provider>
	);
};

export default ProfilePage;
