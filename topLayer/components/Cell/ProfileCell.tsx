import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-remix-icon';

import GlobalStyles from '../../constants/GlobalStyles';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture'; // Import the ProfilePicture component

import {
	isMarkedPrivateUser,
	markedPrivateUser,
	markedUser,
} from '../../pages/Main';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { StackNavigation } from '../../constants/Enums';
import { baseUrl } from '../../utils/apiUtils';
import axios from 'axios';
import {
	axiosEndpointErrorHandler,
	axiosEndpointErrorHandlerNoAlert,
} from '../../utils/ErrorHandlers';

interface ProfileCellPropsType {
	user: markedPrivateUser | markedUser;
}

const ProfileCell = ({ user }: ProfileCellPropsType) => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const [iconName, setIconName] = useState(
		user.marked
			? GlobalStyles.icons.bookmarkFill
			: GlobalStyles.icons.bookmarkOutline
	);

	let userProcessed: markedUser;
	if (isMarkedPrivateUser(user)) {
		userProcessed = {
			...user,
			first_name: '',
			last_name: '',
			email: '',
			followers: [],
			following: [],
			pp_url: '',
		};
	} else {
		userProcessed = user;
	}

	const followUser = async () => {
		try {
			const { data, status } = await axios.post(
				`${baseUrl}/api/private/users/follow`,
				{
					followedId: userProcessed.uid,
				}
			);
			if (status === 200) {
				console.log('Successfully Followed User: ', data.message);
			} else {
				throw new Error('An error has occurred while Following A User');
			}
		} catch (error) {
			void axiosEndpointErrorHandlerNoAlert(error);
		}
	};

	const unFollowUser = async () => {
		try {
			const { data, status } = await axios.post(
				`${baseUrl}/api/private/users/unfollow`,
				{
					unfollowedId: userProcessed.uid,
				}
			);
			if (status === 200) {
				console.log('Successfully Unfollowed User: ', data.message);
			} else {
				throw new Error('An error has occurred while Unfollowing A User');
			}
		} catch (error) {
			void axiosEndpointErrorHandlerNoAlert(error);
		}
	};

	const handleIconPress = (user: markedUser) => {
		if (user.uid !== '') {
			handleBookmarkPress();
		}
	};

	const handleBookmarkPress = () => {
		if (iconName === GlobalStyles.icons.bookmarkFill) {
			void unFollowUser();
			setIconName(GlobalStyles.icons.bookmarkOutline);
			userProcessed.marked = false;
		} else {
			void followUser();
			setIconName(GlobalStyles.icons.bookmarkFill);
			userProcessed.marked = true;
		}
	};

	const handleProfilePress = (user: markedUser) => {
		if (user.uid !== '') {
			navigation.navigate(StackNavigation.ForeignProfile, {
				markedUser: user,
				setMarked: handleBookmarkPress,
			});
		}
	};

	return (
		<Pressable
			style={styles.container}
			onPress={() => handleProfilePress(userProcessed)}
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
			<Pressable onPress={() => handleIconPress(userProcessed)}>
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
