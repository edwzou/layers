import { View, StyleSheet } from 'react-native';
import React, { type ReactElement } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import Header from '../../components/Header/Header';
import SignUp from './SignUp';

interface SignUpPagePropsType {
	pfpUrlForSignUp: string;
}

const SignUpPage = ({ pfpUrlForSignUp }: SignUpPagePropsType): ReactElement => {
	return (
		<View style={{ gap: 40 }}>
			<Header text="Sign up" leftBack={true} leftButton={true} />
			<View style={styles.container}>
				<SignUp pfpUrlForSignUp={pfpUrlForSignUp} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginHorizontal: GlobalStyles.layout.xGap,
	},
});

export default SignUpPage;
