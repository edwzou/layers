import React, { type ReactElement } from 'react';
import { Text, StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';

interface FullNamePropsType {
	firstName: string;
	lastName: string;
}

export default function FullName({
	firstName,
	lastName,
}: FullNamePropsType): ReactElement {
	const fullName = `${firstName} ${lastName}`;

	return <Text style={styles.text}>{fullName}</Text>;
}

const styles = StyleSheet.create({
	text: {
		textAlign: 'center',
		...GlobalStyles.typography.subtitle,
	},
});
