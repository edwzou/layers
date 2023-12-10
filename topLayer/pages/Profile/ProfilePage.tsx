import React, { useState, useContext, createContext, Dispatch, SetStateAction } from 'react';

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
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../../utils/UserContext';
import { FieldErrors, UseFormHandleSubmit, UseFormSetValue, useForm } from 'react-hook-form';
import { User } from '../../pages/Main';

import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Control, FieldValues, SubmitHandler } from 'react-hook-form';
import { AppContext } from '../../App';

interface FormValues {
	first_name: string,
	last_name: string,
	email: string,
	username: string,
	password: string,
	private_option: boolean,
	pp_url: string,
}

// Define the context type
type ProfilePageContextType = {
	control: Control<FormValues>;
	handleSubmit: UseFormHandleSubmit<FormValues>;
	setValue: UseFormSetValue<FormValues>;
	setFormData: Dispatch<SetStateAction<FormValues>>;
	pp_url: string;
	errors: FieldErrors<FormValues>;
};

// Create the context with the defined type
export const ProfilePageContext = createContext<ProfilePageContextType>({
	control: {} as Control<FormValues>,
	handleSubmit: {} as UseFormHandleSubmit<FormValues>,
	setValue: {} as UseFormSetValue<FormValues>,
	setFormData: () => { },
	pp_url: '',
	errors: {} as FieldErrors<FormValues>
});

const ProfilePage = () => {

	const { setShouldRefreshProfilePage } = useContext(AppContext);

	const { data, updateData } = useContext(UserContext);

	const { first_name, last_name, email, username, private_option, pp_url } = data as User;

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
		formState: { dirtyFields, errors }
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

		console.log(updatedFields)

		try {
			const response = await axios.put(`${baseUrl}/api/private/users`, updatedFields, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.status === 200) {
				try {
					// Causes a huge mess. Look into later. Just refresh and re-fetch for now.
					// const sessionData = JSON.stringify(response.data.data);
					// await AsyncStorage.setItem('session', sessionData);
					// updateData(sessionData);
					setShouldRefreshProfilePage(true)
				} catch (error) {
					console.log(error);
				}
			} else {
				throw new Error('An error has occurred');
			}
		} catch (error) {
			alert(error);
		}
	};

	return (
		<ProfilePageContext.Provider value={{ control, handleSubmit, setValue, setFormData, pp_url, errors }}>
			<NavigationContainer
				independent={true}>
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
						}}>
						<Stack.Screen
							name={StackNavigation.Feedback}
							component={FeedbackPage}
							options={{
								headerRight: () => headerButton({
									type: StepOverTypes.send,
									handlePress: () => {
										console.log("Hello")
									},
								}),
							}}
						/>
						<Stack.Screen
							name={StackNavigation.Settings}
							component={SettingsPage}
							options={{
								headerLeft: () => headerButton({
									type: StepOverTypes.logout,
									handlePress: handleLogout
								}),
								headerRight: () => headerButton({
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
					</Stack.Group>
				</Stack.Navigator>
			</NavigationContainer>
		</ProfilePageContext.Provider>
	);
};

export default ProfilePage;
