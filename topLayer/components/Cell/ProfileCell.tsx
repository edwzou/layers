import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-remix-icon';

import GlobalStyles from '../../constants/GlobalStyles';

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
			const { data, status } = await axios.get(`${baseUrl}/api/users/${userID}`)

			if (status === 200) {
				console.log('Successfully fetched foreign user ProfileCell')
				return setUser(data.data[0])
			} else {
				console.log('Failed to fetch foreign user ProfileCell')
			}

			return setUser(null);
		};

		void getUser();
	}, [])

	const handleIconPress = () => {
		if (iconName === GlobalStyles.icons.bookmarkFill) {
			setIconName(GlobalStyles.icons.bookmarkOutline);
		} else {
			setIconName(GlobalStyles.icons.bookmarkFill);
		}
	};

	return (
		<Pressable style={styles.container} onPress={handleProfilePress}>
			<Image source={{ uri: user ? user.pp_url : '' }} style={styles.profilePicture} />
			<View style={styles.textContainer}>
				<Text style={styles.username}>{user ? user.username : ''}</Text>
				<Text style={styles.fullName}>
					{user ? user.first_name : ''} {user ? user.last_name : ''}
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
		alignItems: 'center',
		paddingTop: 20,
	},
	profilePicture: {
		width: GlobalStyles.sizing.pfp.small,
		height: GlobalStyles.sizing.pfp.small,
		borderRadius: GlobalStyles.sizing.pfp.small / 2,
		marginRight: 10,
	},
	textContainer: {
		flex: 1,
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
