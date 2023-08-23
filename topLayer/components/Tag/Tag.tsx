import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import GlobalStyles from '../../constants/GlobalStyles';
import Icon from 'react-native-remix-icon';
import { TagAction } from '../../constants/Enums';
import { capitalizeFirstLetter } from '../../utils/misc';

interface TagPropsType {
	type: { category: string; action: string };
	label?: string;
	bgColor?: string;
	onPress?: () => void;
}

const Tag = ({
	type,
	label,
	bgColor,
	onPress,
}: TagPropsType) => {
	return (
		// This Text wrapper allows for the container to have min-content property
		<Text>
			{type.action === TagAction.remove || type.action === TagAction.static || type.action === TagAction.push ? (
				<Pressable onPress={type.action === TagAction.remove || type.action === TagAction.push ? onPress :
					undefined}>
					<View
						style={[
							styles.container,
							GlobalStyles.utils.tagShadow,
							{
								shadowColor: label === "White" ? GlobalStyles.colorPalette.primary[300] : bgColor || GlobalStyles.colorPalette.primary[500],
								backgroundColor:
									bgColor || GlobalStyles.colorPalette.primary[500],
								justifyContent: type.action === TagAction.remove ? 'space-between' : 'center',
							},
						]}
					>
						<Text style={{ marginRight: type.action === TagAction.remove ? 2.5 : 0 }}>
							<Text style={{
								color: label === "White" ? GlobalStyles.colorPalette.primary[900]
									: GlobalStyles.colorPalette.primary[100], ...GlobalStyles.typography.body
							}}>
								{label}
							</Text>

						</Text>
						{type.action === TagAction.remove ? (
							<Icon
								name={GlobalStyles.icons.closeOutline}
								color={label === "White" ? GlobalStyles.colorPalette.primary[900]
									: GlobalStyles.colorPalette.primary[100]}
								size={GlobalStyles.sizing.icon.xSmall}
							/>
						) : null}
					</View>
				</Pressable>
			) : (
				<Pressable
					onPress={onPress}
					style={{ marginRight: 2.5 }}
				>
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
						<Text>
							<Text style={{ color: GlobalStyles.colorPalette.primary[300], ...GlobalStyles.typography.body, }}>
								{capitalizeFirstLetter(type.category)}
							</Text>
						</Text>
					</View>
				</Pressable>
			)}
		</Text>
	);
};

export default Tag;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		alignItems: 'center',
		borderRadius: 1000,
		flexDirection: 'row',
	},
});
