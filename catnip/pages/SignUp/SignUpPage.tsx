import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import Header from '../../components/Header/Header';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import SignUp from './SignUp';

const SignUpPage = () => {
	return (
		<View style={styles.container}>
			<Header text="Sign up" />
			<Pressable
				onPress={() => {
					console.log('PFP Click');
				}}
			>
				<ProfilePicture />
			</Pressable>
			<SignUp />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginHorizontal: GlobalStyles.layout.xGap,
		marginTop: GlobalStyles.layout.topHeaderGap,
		gap: 40,
	},
});

export default SignUpPage;
