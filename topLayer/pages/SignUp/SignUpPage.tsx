import { View, StyleSheet } from 'react-native';
import React from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import Header from '../../components/Header/Header';
import SignUp from './SignUp';

const SignUpPage: React.FC = () => {
	return (
		<View style={{ gap: 30 }}>
			<Header text="Sign up" leftBack={true} leftButton={true} />
			<View style={styles.container}>
				<SignUp />
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
