import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackTypes } from 'utils/StackNavigation';
import GlobalStyles from '../constants/GlobalStyles';
import Icon from 'react-native-remix-icon';

const SignUpPage = () => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Pressable
					onPress={() => {
						navigation.goBack();
					}}
					style={{ position: 'absolute', left: 0 }}
				>
					<Icon
						name={GlobalStyles.icons.backOutline}
						size={GlobalStyles.sizing.icon}
					>
						Back
					</Icon>
				</Pressable>
				<Text style={GlobalStyles.typography.subtitle}>Sign up</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		alignItems: 'center',
		width: '100%',
		paddingHorizontal: GlobalStyles.layout.xGap,
		marginTop: GlobalStyles.layout.topHeaderGap,
		backgroundColor: GlobalStyles.colorPalette.background,
	},
});

export default SignUpPage;
