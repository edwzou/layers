import React, { useState, useRef, type ReactElement } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-remix-icon';

import GlobalStyles from '../../constants/GlobalStyles';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';

import {
	isPrivateUser,
	type markedPrivateUser,
	type markedUser,
} from '../../types/User';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackTypes } from '../../utils/StackNavigation';
import { StackNavigation } from '../../constants/Enums';
import { followUser, unFollowUser } from '../../endpoints/followUser';
import { useMarkUserFuncDispatch } from '../../Contexts/ForeignUserContext';

interface ProfileCellPropsType {
	user: markedPrivateUser | markedUser;
	handleRelationRender: (
		uid: string,
		marked: boolean,
		index: number,
		user: markedUser
	) => number;
}

const ProfileCell = ({
	user,
	handleRelationRender,
}: ProfileCellPropsType): ReactElement => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	const [iconName, setIconName] = useState(
		user.marked
			? GlobalStyles.icons.bookmarkFill
			: GlobalStyles.icons.bookmarkOutline
	);
	const index = useRef<number>(-1);
	const setUserMarkFunc = useMarkUserFuncDispatch();

	let userProcessed: markedUser;
	if (isPrivateUser(user)) {
		userProcessed = {
			...user,
			email: '',
			followers: [],
			following: [],
		};
	} else {
		userProcessed = user;
	}

	const handleIconPress = (user: markedUser): void => {
		if (user.uid !== '') {
			if (iconName === GlobalStyles.icons.bookmarkFill) {
				handleBookmarkPress(true);
				setIconName(GlobalStyles.icons.bookmarkOutline);
				userProcessed.marked = false;
			} else {
				handleBookmarkPress(false);
				setIconName(GlobalStyles.icons.bookmarkFill);
				userProcessed.marked = true;
			}
		}
	};

	const handleBookmarkPress = (marked: boolean): void => {
		if (marked) {
			void unFollowUser(userProcessed.uid);
			index.current = handleRelationRender(
				userProcessed.uid,
				false,
				index.current,
				userProcessed
			);
		} else {
			void followUser(userProcessed.uid);
			index.current = handleRelationRender(
				userProcessed.uid,
				true,
				index.current,
				userProcessed
			);
		}
	};

	const handleProfilePress = (user: markedUser): void => {
		if (user.uid !== '') {
			setUserMarkFunc({
				type: 'new user',
				func: handleBookmarkPress,
			});
			navigation.navigate(StackNavigation.ForeignProfile, {
				markedUser: user,
			});
		}
	};

	return (
		<Pressable
			style={styles.container}
			onPress={() => {
				handleProfilePress(userProcessed);
			}}
		>
			{/* Use the ProfilePicture component to render the user's profile picture */}
			<View style={styles.profilePicture}>
				<ProfilePicture
					imageUrl={userProcessed.profile_picture}
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
			<Pressable
				onPress={() => {
					handleIconPress(userProcessed);
				}}
			>
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
