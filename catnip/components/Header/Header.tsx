import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackTypes } from 'utils/StackNavigation';
import Icon from 'react-native-remix-icon';
import { stepOverHandler } from '.';

type HeaderPropType = {
	text: string;
	back?: boolean;
	stepOver?: {
		type: string;
		url: string;
	};
};

const Header = ({ text, back = true, stepOver }: HeaderPropType) => {
	const navigation = useNavigation<NativeStackNavigationProp<StackTypes>>();
	return (
		<View style={styles.header}>
			{back ? <Pressable
				onPress={() => {
					navigation.goBack();
				}}
				style={{ position: 'absolute', left: 0, paddingRight: 20 }}
			>
				<Icon name={GlobalStyles.icons.backOutline} size={25} />
			</Pressable> : null}
			<Text style={GlobalStyles.typography.subtitle}>{text}</Text>
			{stepOver ? stepOverHandler(stepOver) : null}
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
});

export default Header;
