import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-remix-icon';
import GlobalStyles from '../../constants/GlobalStyles';

interface ProfilePicturePropsType {
	imageUrl?: string;
	base64?: boolean;
	shadow?: boolean;
	size?: number;
}

const ProfilePicture = ({
	imageUrl,
	base64 = false,
	shadow = true,
	size = GlobalStyles.sizing.pfp.regular,
}: ProfilePicturePropsType) => {
	const imgString: string = imageUrl
		? base64
			? `data:image/jpg;base64,${imageUrl}`
			: imageUrl
		: '';

	return (
		// <View style={shadow && GlobalStyles.utils.pfpShadow}> // uncomment for pfp shadow
		<>
			{imgString !== '' ? (
				<Image
					style={[
						styles.profilePicture,
						{
							width: size,
							height: size,
							borderRadius: size / 2,
						},
					]}
					source={{ uri: imageUrl }}
				/>
			) : (
				<View
					style={[
						styles.profilePicture,
						{
							width: size,
							height: size,
							borderRadius: size / 2,
						},
					]}
				>
					<Icon
						name={GlobalStyles.icons.userOutline2}
						color={GlobalStyles.colorPalette.primary[300]}
						size={size / 2}
					/>
				</View>
			)}
		</>
	);
};

export default ProfilePicture;

const styles = StyleSheet.create({
	profilePicture: {
		backgroundColor: GlobalStyles.colorPalette.card[300],
		justifyContent: 'center',
		alignItems: 'center',
		resizeMode: 'cover',
	},
});
