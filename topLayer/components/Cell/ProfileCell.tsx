import React, { useState, useContext } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-remix-icon';

import GlobalStyles from '../../constants/GlobalStyles';

import { ShowProfileContext } from '../../pages/Find/Find';
import { User } from '../../pages/Main';

interface ProfileCellPropsType {
	user: User;
	handleProfilePress: () => void;
}

const ProfileCell = ({ user, handleProfilePress }: ProfileCellPropsType) => {

	const [iconName, setIconName] = useState(GlobalStyles.icons.bookmarkFill);

	const handleIconPress = () => {
		if (iconName === GlobalStyles.icons.bookmarkFill) {
			setIconName(GlobalStyles.icons.bookmarkOutline);
		} else {
			setIconName(GlobalStyles.icons.bookmarkFill);
		}
	};

	return (
		<Pressable style={styles.container} onPress={handleProfilePress}>
			<Image source={user.profilePicture} style={styles.profilePicture} />
			<View style={styles.textContainer}>
				<Text style={styles.username}>{user.username}</Text>
				<Text style={styles.fullName}>
					{user.firstName} {user.lastName}
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
