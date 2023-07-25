import React from 'react';
import { Text, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { StyleSheet } from 'react-native';

export default function FullName({ firstName, lastName }) {
    const fullName = `${firstName} ${lastName}`;

    return (
        <Text style={styles.text}>{fullName}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        ...GlobalStyles.typography.subtitle,
    }
});