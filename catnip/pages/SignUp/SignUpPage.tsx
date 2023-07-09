import { View, StyleSheet } from 'react-native';
import React from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import Header from '../../components/Header/Header';
import SignUp from './SignUp';

const SignUpPage = () => {
	return (
		<View style={styles.container}>
			<Header text="Sign up" />
			<SignUp />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginHorizontal: GlobalStyles.layout.xGap,
		gap: 40,
	},
});

export default SignUpPage;
