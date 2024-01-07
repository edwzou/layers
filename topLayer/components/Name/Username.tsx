import React, { type ReactElement } from 'react';
import { Text, StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';

interface UsernamePropsType {
	username: string;
}

export default function Username({
	username,
}: UsernamePropsType): ReactElement {
	return <Text style={styles.text}>{username}</Text>;
}

const styles = StyleSheet.create({
	text: {
		textAlign: 'center',
		color: GlobalStyles.colorPalette.primary[300],
		...GlobalStyles.typography.body,
	},
});
