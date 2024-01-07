import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { type ReactElement } from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import Icon from 'react-native-remix-icon';
import { TagAction } from '../../constants/Enums';

interface TagPropsType {
	type: { category: string; action: string };
	label?: string;
	bgColor?: string;
	onPress?: () => void;
}

const Tag = ({ type, label, bgColor, onPress }: TagPropsType): ReactElement => {
	return type.action === TagAction.remove ||
		type.action === TagAction.static ||
		type.action === TagAction.push ? (
		<Pressable
			onPress={
				type.action === TagAction.remove || type.action === TagAction.push
					? onPress
					: undefined
			}
		>
			<View
				style={[
					styles.container,
					GlobalStyles.utils.tagShadow,
					{
						shadowColor:
							label === 'White' || label === 'Cream'
								? GlobalStyles.colorPalette.primary[200]
								: bgColor ?? GlobalStyles.colorPalette.primary[500],
						backgroundColor: bgColor ?? GlobalStyles.colorPalette.primary[500],
						justifyContent:
							type.action === TagAction.remove ? 'space-between' : 'center',
						width:
							type.action !== TagAction.push
								? undefined
								: GlobalStyles.sizing.tagHeight,
					},
				]}
			>
				<Text
					style={{
						marginRight: type.action === TagAction.remove ? 2.5 : 0,
						color:
							label === 'White' || label === 'Cream'
								? GlobalStyles.colorPalette.primary[900]
								: GlobalStyles.colorPalette.primary[100],
						...GlobalStyles.typography.body,
					}}
				>
					{type.action !== TagAction.push ? label : ' '}
				</Text>
				{type.action === TagAction.remove ? (
					<Icon
						name={GlobalStyles.icons.closeOutline}
						color={
							label === 'White' || label === 'Cream'
								? GlobalStyles.colorPalette.primary[900]
								: GlobalStyles.colorPalette.primary[100]
						}
						size={GlobalStyles.sizing.icon.xSmall}
					/>
				) : null}
			</View>
		</Pressable>
	) : (
		<Pressable onPress={onPress} style={{ marginRight: 2.5 }}>
			<View
				style={[
					styles.container,
					{
						backgroundColor: GlobalStyles.colorPalette.primary[200],
						justifyContent: 'space-between',
					},
				]}
			>
				<Icon
					name={GlobalStyles.icons.addOutline}
					color={GlobalStyles.colorPalette.primary[300]}
					size={GlobalStyles.sizing.icon.xSmall}
				/>
				<Text
					style={{
						color: GlobalStyles.colorPalette.primary[300],
						marginLeft: 2.5,
						...GlobalStyles.typography.body,
					}}
				>
					{type.category}
				</Text>
			</View>
		</Pressable>
	);
};

export default Tag;

const styles = StyleSheet.create({
	container: {
		...GlobalStyles.utils.tagShape,
	},
});
