import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-remix-icon';
import GlobalStyles from '../../constants/GlobalStyles';

type ProfilePicturePropType = {
	image?: any;
};

const circleWidth = 90;

const ProfilePicture = ({ image }: ProfilePicturePropType) => {
	return (
		<View>
			<Text>
				{image ? (
					<Image
						style={styles.profilePicture}
						source={{ uri: image !== '' || !image ? image : null }}
					/>
				) : (
					<View style={styles.profilePicture}>
						<Icon
							name={GlobalStyles.icons.userOutline2}
							color={GlobalStyles.colorPalette.primary[300]}
							size={35}
						/>
					</View>
				)}
			</Text>
		</View>
	);
};

export default ProfilePicture;

const styles = StyleSheet.create({
	profilePicture: {
		width: circleWidth,
		height: circleWidth,
		borderRadius: circleWidth / 2,
		backgroundColor: GlobalStyles.colorPalette.primary[200],
		justifyContent: 'center',
		alignItems: 'center',
		resizeMode: 'cover',
	},
});
