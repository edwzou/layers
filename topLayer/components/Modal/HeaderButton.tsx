import React, { type ReactElement } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { StepOverTypes } from '../../constants/Enums';
import Icon from 'react-native-remix-icon';

export interface HeaderButtonPropsType {
	type: string;
	handlePress: () => void;
}

export function headerButton({
	type,
	handlePress,
}: HeaderButtonPropsType): ReactElement {
	switch (type) {
		case StepOverTypes.send: {
			return (
				<Pressable onPress={handlePress}>
					<Icon
						name={GlobalStyles.icons.sendOutline}
						color={GlobalStyles.colorPalette.info[500]}
						size={GlobalStyles.sizing.icon.regular}
					/>
				</Pressable>
			);
		}
		case StepOverTypes.edit: {
			return (
				<Pressable onPress={handlePress}>
					<Text style={styles.textButton}>{StepOverTypes.edit}</Text>
				</Pressable>
			);
		}
		case StepOverTypes.done: {
			return (
				<Pressable onPress={handlePress}>
					<Text style={styles.textButton}>{StepOverTypes.done}</Text>
				</Pressable>
			);
		}
		case StepOverTypes.update: {
			return (
				<Pressable onPress={handlePress}>
					<Text style={styles.textButton}>{StepOverTypes.update}</Text>
				</Pressable>
			);
		}
		case StepOverTypes.logout: {
			return (
				<Pressable onPress={handlePress}>
					<Text style={styles.textButton}>{StepOverTypes.logout}</Text>
				</Pressable>
			);
		}
		case StepOverTypes.leftArrow: {
			return (
				<Pressable onPress={handlePress} style={styles.leftArrow}>
					<Icon
						name={GlobalStyles.icons.backOutline}
						color={GlobalStyles.colorPalette.primary[900]}
						size={GlobalStyles.sizing.icon.regular}
					/>
				</Pressable>
			);
		}
		case StepOverTypes.rightArrow: {
			return (
				<Pressable onPress={handlePress} style={styles.rightArrow}>
					<Icon
						name={GlobalStyles.icons.nextOutline}
						color={GlobalStyles.colorPalette.primary[900]}
						size={GlobalStyles.sizing.icon.regular}
					/>
				</Pressable>
			);
		}
		default:
			return <></>; // Handle default case if needed
	}
}

const styles = StyleSheet.create({
	textButton: {
		color: GlobalStyles.colorPalette.info[500],
		...GlobalStyles.typography.body,
	},

	leftArrow: {
		position: 'absolute',
		left: 10,
		paddingRight: 20,
	},
	rightArrow: {
		position: 'absolute',
		right: 10,
		paddingLeft: 20,
	},
});
