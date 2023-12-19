import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-remix-icon';
import GlobalStyles from '../../constants/GlobalStyles';

interface ProfilePicturePropsType {
	imageUrl?: string;
	base64?: boolean;
	shadow?: boolean;
	size?: number;
}

const ProfilePicture = ({ imageUrl, base64 = false, shadow = true, size = GlobalStyles.sizing.pfp.regular }: ProfilePicturePropsType) => {
	const imgString = imageUrl ? (base64 ? `data:image/jpg;base64,${imageUrl}` : imageUrl) : '';
	const [isValidImage, setIsValidImage] = useState<boolean>(false);

	// Function to check if the image URL is valid
	const isValidImageUrl = (imageUrl: string): boolean => {
		// Check if the imageUrl is empty
		if (imageUrl === '') {
			return false;
		}

		// Regular expression to check the pattern
		const regex = /^https:\/\/.*\.s3\..*\.amazonaws\.com\/.+$/;
		return regex.test(imageUrl);
	};

	const checkImageUrl = (imageUrl: string) => {
		const isValid = isValidImageUrl(imageUrl);
		setIsValidImage(isValid);
	};

	useEffect(() => {
		checkImageUrl(imgString);
	}, [imgString]);

	const renderProfilePicture = () => {
		if (isValidImage === true) {
			return <View style={shadow && GlobalStyles.utils.pfpShadow}>
				<Image style={[
					styles.profilePicture,
					{
						width: size,
						height: size,
						borderRadius: size / 2,
					}
				]}
					source={{ uri: imageUrl }} />
			</View>;
		} else {
			// If imageUrl is not provided or the image is not valid, render the default option
			return (
				<View style={[
					styles.profilePicture,
					{
						width: size,
						height: size,
						borderRadius: size / 2,
					}
				]}>
					<Icon
						name={GlobalStyles.icons.userOutline2}
						color={GlobalStyles.colorPalette.primary[300]}
						size={size / 2}
					/>
				</View>
			);
		}
	};

	return <>{renderProfilePicture()}</>;
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
