import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-remix-icon';

import GlobalStyles from '../../constants/GlobalStyles';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture'; // Import the ProfilePicture component

import { isPrivateUser, privateUser, User } from '../../pages/Main';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { StackNavigation } from '../../constants/Enums';
import { baseUrl } from '../../utils/apiUtils';
import axios from 'axios';
import { axiosEndpointErrorHandler } from '../../utils/ErrorHandlers';

const defaultUser: User = {
	uid: '',
	first_name: '',
	last_name: '',
	email: '',
	username: '',
	private_option: false,
	followers: [],
	following: [],
	pp_url: '',
};

interface ProfileCellPropsType {
	user: privateUser | User | string;
	marked: boolean;
}

const ProfileCell = ({ user, marked }: ProfileCellPropsType) => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const [iconName, setIconName] = useState(
		marked
			? GlobalStyles.icons.bookmarkFill
			: GlobalStyles.icons.bookmarkOutline
	);

	let baseUser: User;
	if (typeof user === 'string') {
		baseUser = defaultUser;
	} else if (isPrivateUser(user)) {
		baseUser = {
			...user,
			first_name: '',
			last_name: '',
			email: '',
			followers: [],
			following: [],
			pp_url: '',
		};
	} else {
		baseUser = user;
	}
	const [userProcessed, setUser] = useState<User>(baseUser);

	const getUser = async (id: string) => {
		try {
			const { data, status } = await axios.get(`${baseUrl}/api/users/${id}`);

			if (status === 200) {
				console.log('Successfully fetched foreign user ProfileCell');
				setUser(data.data);
			} else {
				console.log('Failed to fetch foreign user ProfileCell');
			}
		} catch (error) {
			void axiosEndpointErrorHandler(error);
		}
	};

	useEffect(() => {
		if (typeof user === 'string' && userProcessed.uid === '') {
			void getUser(user);
		}
	}, [userProcessed]);

	const handleIconPress = () => {
		if (iconName === GlobalStyles.icons.bookmarkFill) {
			setIconName(GlobalStyles.icons.bookmarkOutline);
		} else {
			setIconName(GlobalStyles.icons.bookmarkFill);
		}
	};

	const handleProfilePress = (userID: string) => {
		if (userID !== '') {
			navigation.navigate(StackNavigation.ForeignProfile, {
				userID: userID,
			});
		}
	};

	return (
		<Pressable
			style={styles.container}
			onPress={() => handleProfilePress(userProcessed.uid)}
		>
			{/* Use the ProfilePicture component to render the user's profile picture */}
			<View style={styles.profilePicture}>
				<ProfilePicture
					imageUrl={userProcessed.pp_url}
					base64={false}
					size={GlobalStyles.sizing.pfp.small}
					shadow={false}
				/>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.username}>{userProcessed.username}</Text>
				<Text style={styles.fullName}>
					{`${userProcessed.first_name} ${userProcessed.last_name}`}
				</Text>
			</View>
			<Pressable onPress={handleIconPress}>
				<Icon
					name={iconName}
					color={GlobalStyles.colorPalette.primary[900]}
					size={GlobalStyles.sizing.icon.small}
				/>
			</Pressable>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textContainer: {
		flex: 1,
		marginRight: 10,
	},
	profilePicture: {
		marginRight: 10,
	},
	username: {
		...GlobalStyles.typography.body,
		color: GlobalStyles.colorPalette.primary[900],
	},
	fullName: {
		...GlobalStyles.typography.body2,
		color: GlobalStyles.colorPalette.primary[400],
	},
	icon: {
		marginLeft: 'auto',
	},
});

export default ProfileCell;
