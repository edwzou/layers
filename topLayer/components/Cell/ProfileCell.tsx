import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-remix-icon';

import GlobalStyles from '../../constants/GlobalStyles';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture'; // Import the ProfilePicture component

import axios from 'axios';
import { baseUrl } from '../../utils/apiUtils';
import { User } from '../../pages/Main';

interface ProfileCellPropsType {
	userID: string;
	handleProfilePress: () => void;
}

const ProfileCell = ({ userID, handleProfilePress }: ProfileCellPropsType) => {
	const [iconName, setIconName] = useState(GlobalStyles.icons.bookmarkFill);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const getUser = async () => {
			const { data, status } = await axios.get(`${baseUrl}/api/users/${userID}`);

			if (status === 200) {
				console.log('Successfully fetched foreign user ProfileCell');
				setUser(data.data);
			} else {
				console.log('Failed to fetch foreign user ProfileCell');
				setUser(null);
			}
		};

		void getUser();
	}, [userID]);

	const handleIconPress = () => {
		if (iconName === GlobalStyles.icons.bookmarkFill) {
			setIconName(GlobalStyles.icons.bookmarkOutline);
		} else {
			setIconName(GlobalStyles.icons.bookmarkFill);
		}
	};

	return (
		<Pressable style={styles.container} onPress={handleProfilePress}>
			{/* Use the ProfilePicture component to render the user's profile picture */}
			<View style={styles.profilePicture}>
				<ProfilePicture imageUrl={user ? user.pp_url : ''} base64={false} size={GlobalStyles.sizing.pfp.small} shadow={false} />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.username}>{user ? user.username : ''}</Text>
				<Text style={styles.fullName}>
					{user ? `${user.first_name} ${user.last_name}` : ''}
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
