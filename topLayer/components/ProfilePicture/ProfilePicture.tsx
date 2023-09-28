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
	const [isValidImage, setIsValidImage] = useState<boolean | undefined>(undefined);

	// Function to check if the image URL is valid
	const isImageValid = (url: string) => {
		if (!url) {
			setIsValidImage(false); // Handle the case where imageUrl is not defined
			return;
		}

		Image.getSize(url, () => {
			setIsValidImage(true); // Image dimensions were retrieved successfully
		}, () => {
			setIsValidImage(false); // Image dimensions could not be retrieved (invalid or missing image)
		});
	};

	useEffect(() => {
		isImageValid(imgString);
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
