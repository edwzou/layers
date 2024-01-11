import { View } from 'react-native';
import React from 'react';
import Header from '../../components/Header/Header';
import SignUp from './SignUp';

const SignUpPage: React.FC = () => {
	return (
		<View style={{ gap: 30, flex: 1 }}>
			<Header text="Sign up" leftBack={true} leftButton={true} />
			<SignUp />
		</View>
	);
};

export default SignUpPage;
