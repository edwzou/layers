import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { find } from '../../constants/GlobalStrings';
import { User } from '../../pages/Main';

interface MarkedPropsType {
	users: User[];
}

const Marked = ({ users }: MarkedPropsType) => {
	return (
		<View style={styles.container}>
			<View style={styles.textArea}>
				<Text style={GlobalStyles.typography.body}>
					{users.length} {find.marked}
				</Text>
				<Text style={styles.label}>{find.viewYourMarkedProfiles}</Text>
			</View>
			<View style={styles.profilePicturesContainer}>
				{users[0] && <Image source={users[0].profilePicture} style={styles.profilePicture} />}
				{users[1] && <Image source={users[1].profilePicture} style={styles.profilePicture} />}
				{users[2] && <Image source={users[2].profilePicture} style={styles.profilePicture} />}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: GlobalStyles.colorPalette.primary[200],
		borderRadius: GlobalStyles.utils.mediumRadius.borderRadius,
		flexDirection: 'row',
		alignItems: 'center',
	},
	textArea: {
		flex: 1,
		gap: 5,
	},
	title: {
		...GlobalStyles.typography.body,
		color: GlobalStyles.colorPalette.primary[900],
	},
	label: {
		...GlobalStyles.typography.body2,
		color: GlobalStyles.colorPalette.primary[400],
	},
	profilePicturesContainer: {
		flexDirection: 'row',
	},
	profilePicture: {
		width: GlobalStyles.sizing.pfp.small,
		height: GlobalStyles.sizing.pfp.small,
		borderRadius: GlobalStyles.sizing.pfp.small / 2,
		marginLeft: -4,
	},
});

export default Marked;
