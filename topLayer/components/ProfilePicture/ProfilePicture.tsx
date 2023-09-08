import { Image, StyleSheet, Text, View, ImageSourcePropType } from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-remix-icon';
import GlobalStyles from '../../constants/GlobalStyles';
import { UserContext } from '../../utils/UserContext';
import { MainPageContext } from '../../pages/Main/MainPage';

interface ProfilePicturePropsType {
	image: ImageSourcePropType,
}

const ProfilePicture = ({ image }: ProfilePicturePropsType) => {
	const { data } = useContext(UserContext);
	// const image = data ? data.profile_picture : null;

	return (
		<Text>
			{/* {image ? (
				<Image
					style={styles.profilePicture}
					source={{ uri: image !== '' || !image ? image : null }}
				/>
			) : ( */}
			{image ? (
				<Image
					style={styles.profilePicture}
					source={image}
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
	);
};

export default ProfilePicture;

const styles = StyleSheet.create({
	profilePicture: {
		width: GlobalStyles.sizing.pfp.regular,
		height: GlobalStyles.sizing.pfp.regular,
		borderRadius: GlobalStyles.sizing.pfp.regular / 2,
		backgroundColor: GlobalStyles.colorPalette.primary[200],
		justifyContent: 'center',
		alignItems: 'center',
		resizeMode: 'cover',
	},
});
