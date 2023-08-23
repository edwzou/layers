import { View, StyleSheet } from 'react-native';
import React from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import Header from '../../components/Header/Header';
import SignUp from './SignUp';
import { NavigationBack } from '../../constants/Enums';

interface SignUpPagePropsType {
	settings?: boolean;
}

const SignUpPage = ({
	settings,
}: SignUpPagePropsType) => {
	return (
		<View style={{ gap: 40 }}>
			{!settings && <Header text="Sign up" back={NavigationBack.back} />}
			<View style={styles.container}>
				<SignUp settings={settings !== undefined ? settings : false} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginHorizontal: GlobalStyles.layout.xGap,
		paddingTop: GlobalStyles.layout.modalTopPadding,
	},
});

export default SignUpPage;
